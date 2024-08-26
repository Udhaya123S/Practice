const express = require('express');
const router = express.Router();
const phoneNumberController = require('../../controllers/phoneNumber.controller');

// Routes for PhoneNumber
router.post('/add', phoneNumberController.createPhoneNumber);


router.get('/find/:id', phoneNumberController.getPhoneNumberById);

router.put('/update/:id', phoneNumberController.updatePhoneNumber);

router.delete('/delete/:id', phoneNumberController.deletePhoneNumber);

module.exports = router;