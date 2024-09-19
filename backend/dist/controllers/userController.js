/// <reference types="express" />
/// <reference path="../../express.d.ts" />

import { User } from '../models/User.js';
import { fileUploader } from '../utils/upload.js';
// Get user profile
export const getProfile = async (req, res) => {
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
            profilePic: profilePicUrl,
            isVerified: user.isVerified
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: 'Server error' });
        }
        else {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
export const deleteProfile = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error deleting user:', error);
        if (error instanceof Error) {
            return res.status(500).json({ error: 'Server error' });
        }
        else {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user?._id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: 'Server error' });
        }
        else {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
// upload profile picture
const uploadProfilePic = fileUploader('./uploads/profile-pics').single('profilePic');
export const updateProfilePic = async (req, res) => {
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
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    });
};
