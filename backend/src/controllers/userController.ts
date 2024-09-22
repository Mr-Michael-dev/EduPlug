/// <reference types="express" />
/// <reference path="../../express.d.ts" />

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import { fileUploader } from '../utils/upload.js';


// get all users from the database
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Generate the base URL for profile pictures
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Map through the users to construct full URLs for profile pictures
    const usersWithProfilePic = users.map(user => ({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic ? `${baseUrl}${user.profilePic}` : null, // Full URL for the profile picture
      isVerified: user.isVerified,
      activityHistory: user.activityHistory
    }));

    // Return the list of users with profile picture URLs
    return res.json(usersWithProfilePic);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Server error' });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};


// Get user profile
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const profilePicUrl = user.profilePic ? `${baseUrl}${user.profilePic}` : null;

    return res.json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePic: profilePicUrl,  // Full URL for the profile picture
      isVerified: user.isVerified,
      activityHistory: user.activityHistory
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Server error' });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const deleteProfile = async (req: Request, res: Response): Promise<Response> => {
  // confirm user role if admin
  if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
  }

  const userId = req.params.id;
  try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ message: 'User deleted successfully' });
      } catch (error) {
          console.error('Error deleting user:', error)
        if (error instanceof Error) {
          return res.status(500).json({ error: 'Server error' });
        } else {
          return res.status(500).json({ error: 'Unknown error occurred' });
        }
      }
    };

// Update user profile
export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(req.user?._id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Server error' });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

// upload profile picture
const uploadProfilePic = fileUploader('./uploads/profile-pics').single('profilePic');

export const updateProfilePic = async (req: Request, res: Response): Promise<void> => {
    uploadProfilePic(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      try {
        const user = await User.findById(req.user?._id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Save the profile picture
        user.profilePic = `/uploads/profile-pics/${req.file?.filename}`;
        await user.save();
        // Generate the base URL for the profilePic image
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        // Construct the full URL for the profilePic image if it exists
        const profilePicUrl = user.profilePic ? `${baseUrl}${user.profilePic}` : null;
        return res.json(
          { profilePic: profilePicUrl }
        );
      } catch (error) {
        return res.status(500).json({ error: 'Server error' });
      }
    });
};

export const getActivityHistory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.user?._id).populate('activityHistory.postId');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user.activityHistory);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Server error' });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
