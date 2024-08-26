const httpStatus = require('http-status');
const phoneNumberService = require('../services/phoneNumber.service');


const createPhoneNumber = async (req, res) => {
    try {
        const newPhoneNumber = await phoneNumberService.createPhoneNumber(req.body);
        res.status(httpStatus.CREATED).json({
            message: 'Phone number created successfully',
            data: newPhoneNumber
        });
    } catch (error) {
        console.error('Error creating phone number:', error.message);
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
};

const getPhoneNumberById = async (req, res) => {
    try {
        const phoneNumber = await phoneNumberService.getPhoneNumberById(req.params.id);
        res.status(httpStatus.OK).json(phoneNumber);
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({ message: error.message });
    }
};

const updatePhoneNumber = async (req, res) => {
    try {
        const updatedPhoneNumber = await phoneNumberService.updatePhoneNumber(req.params.id, req.body);
        res.status(httpStatus.OK).json({
            message: 'Phone number updated successfully',
            data: updatedPhoneNumber
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
};

const deletePhoneNumber = async (req, res) => {
    try {
        const result = await phoneNumberService.deletePhoneNumber(req.params.id);
        res.status(httpStatus.OK).json(result);
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({ message: error.message });
    }
};

module.exports = {
    createPhoneNumber,
    getPhoneNumberById,
    updatePhoneNumber,
    deletePhoneNumber
};
