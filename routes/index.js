const express = require('express');
const router = express.Router();

// simulation
const simulationController = require('../controllers/simulationController');

router.get('/averageTemperature', simulationController.getAverageTemperature);
router.get('/computedGrids', simulationController.getComputedGrids);

module.exports = router;
