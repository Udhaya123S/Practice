const express = require('express');
const stateController = require('../../controllers/state.controller');

const router = express.Router();

// POST route to create a new state
router.post('/add', stateController.createState);

// GET route to fetch all states
router.get('/list', stateController.getStates);

// GET route to fetch a state by ID
router.get('/find/:id', stateController.getStateById);

// PUT route to update a state by ID
router.put('/update/:id', stateController.updateStateById);

// DELETE route to delete a state by ID
router.delete('/delete/:id', stateController.deleteStateById);

module.exports = router;