
const validatePhoneNumber = (data) => {
    let errors = [];
    if (!data.number) {
        errors.push('Number is required');
    }
    if (!data.type) {
        errors.push('Type is required');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};


module.exports = validatePhoneNumber;
