import multer from 'multer';

export const Upload = multer({
    storage: multer.diskStorage({
        // Add your storage configurations here
    })
});
