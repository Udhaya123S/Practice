const httpStatus = require('http-status');
const upload = require('../config/multer');
const userService = require('../services/user.service');

// Sign up a new user
const signUp = async (req, res) => {
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'document', maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
        }

        try {
            const { firstName, lastName, userName, email, password, Number, Gender, role, address } = req.body;
            const photo = req.files['photo'] ? req.files['photo'][0].path : null;
            const document = req.files['document'] ? req.files['document'][0].path : null;

            if (!firstName || !lastName || !userName || !email || !password || !Number || !Gender) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: 'All required fields must be provided' });
            }

            const newUser = await userService.createUser({
                firstName,
                lastName,
                userName,
                email,
                password,
                Number,
                Gender,
                role,
                address,
                photo,
                document
            });

            res.status(httpStatus.CREATED).json({
                message: 'User created successfully',
                data: newUser,
            });
        } catch (error) {
            console.error('Error during sign-up:', error.message);
            if (error.message.includes('unique constraint')) {
                return res.status(httpStatus.CONFLICT).json({ message: 'Email or Username already in use' });
            }
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    });
};

// Get all users with optional filters
const getAllUsers = async (req, res) => {
    try {
        const filters = req.query;
        const users = await userService.getAllUsers(filters);
        res.status(httpStatus.OK).json(users);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(httpStatus.OK).json(user);
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({ error: error.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'document', maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
        }

        try {
            const photo = req.files['photo'] ? req.files['photo'][0].path : null;
            const document = req.files['document'] ? req.files['document'][0].path : null;

            const updatedData = {
                ...req.body,
                photo: photo || req.body.photo,
                document: document || req.body.document,
            };

            const user = await userService.updateUser(req.params.id, updatedData);
            res.status(httpStatus.OK).json(user);
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
        }
    });
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const message = await userService.deleteUser(req.params.id);
        res.status(httpStatus.OK).json({ message });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
};

module.exports = {
    signUp,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
