import { Request, Response } from 'express';
import { Post } from '../models/Post.js';
import { fileUploader } from '../utils/upload.js';

const uploadPostBanner = fileUploader('./uploads/post-banners').single('banner');

// Create post for contributors
export const createPost = async (req: Request, res: Response): Promise<void> => {
    uploadPostBanner(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Fixed the condition for checking user role
      if (req.user?.role !== 'contributor' && req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Only contributors or admins can create posts' });
      }

      const { title, content } = req.body;
      try {
        const post = new Post({
          title,
          content,
          banner: `/uploads/post-banners/${req.file?.filename}`, // Save banner URL
          author: req.user._id
        });
        await post.save();
        return res.status(201).json(post);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    });
};


// Delete post (Admins or post authors can delete)
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  if (req.user?.role !== 'admin' && post.author.toString() !== req.user?._id.toString()) {
    res.status(403).json({ error: 'Unauthorized' });
    return;
  }

  await post.deleteOne(); // Updated here
  res.json({ message: 'Post deleted' });
}

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments');
    
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    
    // Generate the base URL for the banner image
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    // Construct the full URL for the banner image if it exists
    const bannerUrl = post.banner ? `${baseUrl}${post.banner}` : null;
    
    // Return the post with the full banner URL
    res.json({
      ...post.toObject(),  // Convert the post to a plain object
      banner: bannerUrl     // Full URL for the banner image
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (!req.user || post.author.toString() !== req.user._id.toString()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.tags = req.body.tags || post.tags;

    await post.save();
    res.json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Visitors can view post

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse the page and limit query parameters, set defaults if not provided
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of posts to skip for pagination
    const skip = (page - 1) * limit;

    // Fetch the total number of posts
    const totalPosts = await Post.countDocuments();

    // Find the posts with pagination, and populate related data
    const posts = await Post.find()
      .populate('author', 'username profilePic')
      .populate('comments')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optionally sort posts by creation date (latest first)

    // Generate the base URL for the banner images
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Map through posts to construct the full URL for each banner image
    const postsWithFullBannerUrls = posts.map(post => {
      const profilePicUrl = post.author?.profilePic ? `${baseUrl}${post.author.profilePic}` : null;
      const bannerUrl = post.banner ? `${baseUrl}${post.banner}` : null;
      return {
        ...post.toObject(),
        banner: bannerUrl,
        author: {profilePic: profilePicUrl}
      };
    });

    // Send the paginated data along with meta information
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      hasMore: page * limit < totalPosts, // Check if there are more posts to load
      posts: postsWithFullBannerUrls
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    post.likes = post.likes.filter((user) => user.toString() !== req.user!._id.toString());


    await post.save();
    res.json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
