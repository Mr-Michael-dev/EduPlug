import { Router } from 'express';
import { cache } from '../models/cache.js';
import { createPost, getPosts, getPostById, updatePost, deletePost, likePost, } from '../controllers/postController.js';
import { protect } from '../middleware/auth.js'; // Changed middleware path
const router = Router();
// Routes for creating a post and getting all posts (with caching)
router.route('/')
    .post(protect, createPost) // Protect route for creating posts
    .get(cache, getPosts); // Use cache middleware for getting posts
// Routes for specific post CRUD operations
router.route('/:id')
    .get(getPostById) // Anyone can get a post
    .put(protect, updatePost) // Protect route for updating posts
    .delete(protect, deletePost); // Protect route for deleting posts
// Route for liking a post
router.route('/:id/like')
<<<<<<< HEAD
    .post(auth_1.protect, postController_1.likePost); // Protect route for liking posts
exports.default = router;
//# sourceMappingURL=postRoutes.js.map
=======
    .post(protect, likePost); // Protect route for liking posts
export default router;
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
