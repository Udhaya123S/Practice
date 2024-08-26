const { PhoneNumber } = require('../models');
const validatePhoneNumber = require('../validations/phoneNumber.validation');

const createPhoneNumber = async (phoneNumberData) => {
    const { isValid, errors } = validatePhoneNumber(phoneNumberData);
    if (!isValid) {
        const errorMessage = `Validation failed: ${errors.join(', ')}`;
        throw new Error(errorMessage);
    }

    try {
        const newPhoneNumber = await PhoneNumber.create(phoneNumberData);
        return newPhoneNumber;
    } catch (error) {
        throw new Error(`Error creating phone number: ${error.message}`);
    }
};
const getPhoneNumberById = async (id) => {
    try {
        const phoneNumber = await PhoneNumber.findByPk(id);
        if (!phoneNumber) {
            throw new Error('Phone number not found');
        }
        return phoneNumber;
    } catch (error) {
        throw new Error(`Error fetching phone number: ${error.message}`);
    }
};

const updatePhoneNumber = async (id, phoneNumberData) => {
    const { isValid, errors } = validatePhoneNumber(phoneNumberData);
    if (!isValid) {
        const errorMessage = `Validation failed: ${errors.join(', ')}`;
        throw new Error(errorMessage);
    }

    try {
        const phoneNumber = await PhoneNumber.findByPk(id);
        if (!phoneNumber) {
            throw new Error('Phone number not found');
        }

        await phoneNumber.update(phoneNumberData);
        return phoneNumber;
    } catch (error) {
        throw new Error(`Error updating phone number: ${error.message}`);
    }
};

const deletePhoneNumber = async (id) => {
    try {
        const phoneNumber = await PhoneNumber.findByPk(id);
        if (!phoneNumber) {
            throw new Error('Phone number not found');
        }

        await phoneNumber.destroy();
        return { message: 'Phone number deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting phone number: ${error.message}`);
    }
};

module.exports = {
    createPhoneNumber,
    getPhoneNumberById,
    updatePhoneNumber,
    deletePhoneNumber
};
