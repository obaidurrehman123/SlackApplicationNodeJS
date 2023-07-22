const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary using the Cloudinary URL
cloudinary.config(process.env.CLOUDINARY_URL);

// Create the multer middleware
const upload = multer({ storage: multer.memoryStorage() });

// Override the default upload behavior with Cloudinary upload
const multerUpload = upload.single;

upload.single = function (field) {
    return function (req, res, next) {
        multerUpload.call(upload, field)(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // Handle Multer errors
                return res.status(400).json({ message: err.message });
            } else if (err) {
                // Handle other errors
                return next(err);
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Save the file to a temporary location on the disk
            const tempFilePath = path.join(__dirname, '../temp', req.file.originalname);
            fs.writeFileSync(tempFilePath, req.file.buffer);

            cloudinary.uploader
                .upload(tempFilePath) // Upload the temporary file to Cloudinary
                .then((result) => {
                    // Delete the temporary file
                    fs.unlinkSync(tempFilePath);

                    req.file.cloudinaryUrl = result.secure_url;
                    next();
                })
                .catch((error) => {
                    // Delete the temporary file in case of an error
                    fs.unlinkSync(tempFilePath);

                    next(error);
                });
        });
    };
};

module.exports = upload;
