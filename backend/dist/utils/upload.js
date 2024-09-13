import multer from 'multer';
import path from 'path';
import fs from 'fs';
export const fileUploader = (uploadPath, fileSizeLimit = 5 * 1024 * 1024) => {
    // verify upload directory
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    // create storage engine
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`);
        },
    });
    // File filter for image types
    const fileFilter = (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        }
        else {
            cb(new Error('Images only!'));
        }
    };
    // Initialize multer with storage, size limit, and file filter
    return multer({
        storage: storage,
        limits: { fileSize: fileSizeLimit },
        fileFilter: fileFilter,
    });
};
