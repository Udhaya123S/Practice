const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to create directories if they do not exist
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Define storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the upload path based on the field name
    const uploadPath = file.fieldname === 'photo' 
      ? path.join(__dirname, '../uploads/photos') 
      : path.join(__dirname, '../uploads/documents');
    
    // Ensure the directory exists
    createDirectoryIfNotExists(uploadPath);

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp and file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
  