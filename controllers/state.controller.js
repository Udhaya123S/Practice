const httpStatus = require('http-status');
const stateService = require('../services/state.service'); 

// Create a new state
const createState = async (req, res) => {
  try {
    const { name, code, status, countryId } = req.body;

    if (!name || !code || !status || !countryId) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'All fields are required'
      });
    }

    const state = await stateService.createState({ name, code, status, countryId });

    res.status(httpStatus.CREATED).json({
      message: 'State created successfully',
      data: state
    });
  } catch (error) {
    console.error('Error creating state:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// Get all state
const getStates = async (req, res) => {
  try {
    let { page = 1, limit = 5, search = '' ,filter = '',sort='asc'} = req.query;

    // Parse and validate page and limit
    page = parseInt(page, 10);
    limit = parseInt(limit, 5);

    // Default to valid values if parsing fails
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 5;

    const result = await stateService.getStates({ page, limit, search ,filter,sort});

    res.status(httpStatus.OK).json({
      message: 'States fetched successfully',
      data: result
    });
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

  // Get a state by ID
const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await stateService.getStateById(id);

    if (!state) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'State not found'
      });
    }

    res.status(httpStatus.OK).json({
      message: 'State fetched successfully',
      data: state
    });
  } catch (error) {
    console.error('Error fetching state:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// Update a state by ID
const updateStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, status, countryId } = req.body;

    const [updated] = await stateService.updateStateById(id, { name, code, status, countryId });

    if (!updated) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'State not found'
      });
    }

    const updatedState = await stateService.getStateById(id);

    res.status(httpStatus.OK).json({
      message: 'State updated successfully',
      data: updatedState
    });
  } catch (error) {
    console.error('Error updating state:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// Delete a state by ID
const deleteStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await stateService.deleteStateById(id);

    if (!deleted) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'State not found'
      });
    }

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error('Error deleting state:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

module.exports = {
  createState,
  getStates,
  getStateById,
  updateStateById,
  deleteStateById
};
