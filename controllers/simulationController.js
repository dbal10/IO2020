let Simulation = require('../Model/simulation');

module.exports.getAverageTemperature = (req, res) => {
  const simulation = new Simulation(
    req.body.items,
    req.body.initialTemperature,
    0.5,
    req.body.mapX,
    req.body.mapY
  );
  res.status(200).json({ avgTemperature: simulation.computeTemperature() });
};

module.exports.getComputedGrids = (req, res) => {
  const simulation = new Simulation(
    req.body.items,
    req.body.initialTemperature,
    0.5,
    req.body.mapX,
    req.body.mapY
  );
  res.status(200).json(simulation.simulate());
};
