// validation/userValidation.js
const validator = require('validator');

const validateUserData = (userData) => {
    const errors = [];

    // Validate username
    if (!userData.userName || !validator.isLength(userData.userName, { min: 3, max: 30 })) {
        errors.push('Username must be between 3 and 30 characters.');
    }

    // Validate email
    if (!userData.email || !validator.isEmail(userData.email)) {
        errors.push('Invalid email format.');
    }

    // Validate password
    if (!userData.password || !validator.isLength(userData.password, { min: 8 })) {
        errors.push('Password must be at least 8 characters long.');
    }
    if (!validator.matches(userData.password, /[A-Z]/)) {
        errors.push('Password must contain at least one uppercase letter.');
    }
    if (!validator.matches(userData.password, /[a-z]/)) {
        errors.push('Password must contain at least one lowercase letter.');
    }
    if (!validator.matches(userData.password, /[0-9]/)) {
        errors.push('Password must contain at least one number.');
    }
    if (!validator.matches(userData.password, /[\W_]/)) {
        errors.push('Password must contain at least one special character.');
    }

    // Validate photo
    if (userData.photo) {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.test(userData.photo)) {
            errors.push('Invalid photo format.');
        }
    }

    // Validate document
    if (userData.document) {
      const allowedExtensions = /(\.pdf|\.doc|\.docx|\.txt)$/i;
      if (!allowedExtensions.test(userData.document)) {
          errors.push('Invalid document format.');
      }
  }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

module.exports = {
    validateUserData,
};
