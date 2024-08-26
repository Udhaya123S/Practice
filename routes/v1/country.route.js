const express = require('express');
const countryController = require('../../controllers/country.controller');

const router = express.Router();

// POST route to create a new country
router.post('/add', countryController.createCountry);

// GET route to fetch all countries
router.get('/list', countryController.getCountries);

// GET route to fetch a country by ID
router.get('/find/:id', countryController.getCountryById);

// PUT route to update a country by ID
router.put('/update/:id', countryController.updateCountryById);

// DELETE route to delete a country by ID
router.delete('/delete/:id', countryController.deleteCountryById);

module.exports = router;
