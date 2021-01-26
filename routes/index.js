const express = require('express');
const router = express.Router();

// simulation
const simulationController = require('../controllers/simulationController');

router.post('/averageTemperature', simulationController.getAverageTemperature);
router.post('/computedGrids', simulationController.getComputedGrids);

module.exports = router;
