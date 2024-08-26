const { validateUserData } = require('../validations/user.validation');
const {User,PhoneNumber,Comment} = require('../models');
const { Op } = require('sequelize');



const createUser = async (userData) => 
    {
  // Validate user data
  const { isValid, errors } = validateUserData(userData);
  if (!isValid) {
      const errorMessage = `Validation failed: ${errors.join(', ')}`;
      throw new Error(errorMessage);
  }

  try {
      // Check if email or username already exists
      const existingUser = await User.findOne({
          where: {
              [Op.or]: [{ email: userData.email }, { userName: userData.userName }],
          },
      });

      if (existingUser) {
          throw new Error('Email or Username already in use');
      }

      // Create new user
      const newUser = await User.create(userData);
      return newUser;
  } catch (error) {
      // Handle database errors or other issues
      throw new Error(`Error creating user: ${error.message}`);
  }
};


const getAllUsers = async (filters) => {
    const where = {};

    if (filters.firstName) {
        where.firstName = { [Op.like]: `%${filters.firstName}%` };
    }

    if (filters.lastName) {
        where.lastName = { [Op.like]: `%${filters.lastName}%` };
    }

    if (filters.userName) {
        where.userName = { [Op.like]: `%${filters.userName}%` };
    }

    if (filters.email) {
        where.email = { [Op.like]: `%${filters.email}%` };
    }

    const users = await User.findAll({ where });
    return users;
};
const getUserById = async (id) => {
    try {
        console.log('Querying with ID:', id);
        const user = await User.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            },
            include: [{ model: PhoneNumber, as: 'phoneNumber' },
                {
                    model: Comment,
                    as: 'comments',
                    where: { isDeleted: false }, 
                    required: false 
                },
            ],
        });
        console.log('Fetched user:', user);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw error;
    }
};
const updateUser = async (id, data) => {
    const { isValid, errors } = validateUserData(data);
    if (!isValid) {
        throw new Error('Validation failed: ' + errors.join(', '));
    }

    const user = await getUserById(id);

    if (data.email || data.userName) {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email: data.email }, { userName: data.userName }],
                id: { [Op.ne]: id },
            },
        });

        if (existingUser) {
            throw new Error('Email or Username already in use');
        }
    }

    await user.update(data);
    return user;
};

const deleteUser = async (id) => {
    const user = await getUserById(id);
    await user.destroy();
    return { message: 'User deleted successfully' };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
