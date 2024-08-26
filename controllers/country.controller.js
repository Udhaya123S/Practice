const httpStatus = require('http-status');
const countryService = require('../services/country.service');

// Create a new country
const createCountry = async (req, res) => {
  try {
    const { name, code, status } = req.body;

    console.log('Request body:', req.body); 

    if (!name || !code || !status) {
      console.log('Validation failed:', { name, code, status }); 
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'All fields are required'
      });
    }

    

    const country = await countryService.createCountry({ name, code, status });

    res.status(httpStatus.CREATED).json({
      message: 'Country created successfully',
      data: country
    });
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// Get all countries
const getCountries = async (req, res) => {
  try {
    const { limit = 5, page = 1, search, status } = req.query;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const result = await countryService.getCountries(parsedPage, parsedLimit, search, status);

    if (!result || !result.rows.length) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'No countries found matching your criteria.',
        data: [],
      });
    }

    res.status(httpStatus.OK).json({
      message: 'Countries fetched successfully',
      data: result.rows,
      total: result.count,
      page: parsedPage,
      limit: parsedLimit,
    });
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get a country by ID
const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await countryService.getCountryById(id);

    if (!country) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Country not found'
      });
    }

    res.status(httpStatus.OK).json({
      message: 'Country fetched successfully',
      data: country
    });
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// Update a country by ID
const updateCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, status } = req.body;

    const [updated] = await countryService.updateCountryById(id, { name, code, status });

    if (!updated) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Country not found'
      });
    }

    const updatedCountry = await countryService.getCountryById(id);

    res.status(httpStatus.OK).json({
      message: 'Country updated successfully',
      data: updatedCountry
    });
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// Delete a country by ID
const deleteCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await countryService.deleteCountryById(id);

    if (!deleted) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Country not found'
      });
    }

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

module.exports = {
  createCountry,
  getCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById
};
