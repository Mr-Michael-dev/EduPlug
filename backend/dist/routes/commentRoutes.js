import { Router } from 'express';
import { addComment, getComments, updateComment, deleteComment, } from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js'; // Changed to use middleware for authentication
const router = Router();
// Define routes
router.get('/', (req, res) => {
    res.send('Comments route');
    // Routes for adding and getting comments for a specific post
    router.route('/:id/comments')
        .post(protect, addComment) // Protect route so only logged-in users can add comments
        .get(getComments); // Anyone can get comments
    // Routes for updating and deleting specific comments
    router.route('/comments/:id')
        .put(protect, updateComment) // Protect route for updating comments
        .delete(protect, deleteComment); // Protect route for deleting comments
});
export default router;
