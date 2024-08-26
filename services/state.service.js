const { State } = require('../models');
const {Op} = require('sequelize');
// Create a new state
const createState = async (data) => {
  return await State.create(data);
};

// Get all states

const getStates = async ({ page = 1, limit = 10, search = '', filter = '', sort = 'asc' }) => {
  // Calculate offset based on the current page and limit
  const offset = (page - 1) * limit;

  // Ensure page and limit are integers
  page = parseInt(page, 5);
  limit = parseInt(limit, 5); // Corrected radix to 10 for decimal parsing

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 5; // Set a default limit if parsing fails

  // Construct the search and filter conditions
  const whereCondition = {
    ...(search && {
      name: {
        [Op.iLike]: `%${search}%`
      }
    }),

    ...(filter && {
      status: filter === 'false' ? false : true // Ensure the filter logic is correct
    })
  };

  // Sort order
  const order = [['name', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']];

  try {
    // Query the database with the constructed conditions
    const states = await State.findAndCountAll({
      where: whereCondition,
      limit: limit,
      offset: offset,
      order: order
    });

    // Return paginated data
    return {
      total: states.count,
      totalPages: Math.ceil(states.count / limit),
      currentPage: page,
      data: states.rows
    };
  } catch (error) {
    console.error('Error fetching states from database:', error);
    throw error;
  }
};


// Get a state by ID
const getStateById = async (id) => {
  return await State.findByPk(id);
};

// Update a state by ID

const updateStateById = async (id, data) => {
  return await State.update(data, { where: { id } });
};

// Delete a state by ID

const deleteStateById = async (id) => {
  try {
    const result = await State.destroy({
      where: { id }
    });
    return result > 0; // Return true if a row was deleted, false otherwise
  } catch (error) {
    console.error('Error in deleteStateById service:', error);
    throw error;
  }
};

module.exports = {
  createState,
  getStates,
  getStateById,
  updateStateById,
  deleteStateById,
};
