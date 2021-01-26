class Simulation {
  constructor(
    items,
    initialTemperature = 21,
    step = 0.5,
    mapX = 100,
    mapY = 100,
    range = 7,
    impactFactor = 0.0001
  ) {
    this.items = items;
    this.initialTemperature = initialTemperature;
    this.step = step;
    this.mapX = mapX;
    this.mapY = mapY;
    this.range = range;
    this.factor = impactFactor;
    this.grids = this._prepareGrid();
  }

  _prepareGrid() {
    let grids = [];

    for (let i = 0; i < this.mapY; i++) {
      for (let j = 0; j < this.mapX; j++) {
        grids.push({
          x: j,
          y: i,
          realHeight: 0,
          itemType: 'vegetation',
          temperature: this.initialTemperature,
        });
      }
    }

    for (let item of this.items) {
      let yIndex = item.y;
      let yIndexEnd = item.y + item.length - 1;

      for (yIndex; yIndex <= yIndexEnd; yIndex++) {
        let xIndex = item.x + this.mapX * yIndex;
        let xIndexEnd = item.x + item.width - 1 + this.mapX * yIndex;
        for (xIndex; xIndex <= xIndexEnd; xIndex++) {
          grids[xIndex].realHeight = item.realHeight;
          grids[xIndex].itemType = item.itemType;
        }
      }
    }
    return grids;
  }

  _establishAreas(item) {
    let area = {};
    for (let dir = 0; dir < 4; dir++) {
      let range = this.range;

      if (dir == 0) {
        let index = item.x - range;
        while (index < 0) {
          range--;
          index = item.x - range;
        }
        area.xp = index;
      }

      if (dir == 1) {
        let index = item.y - range;
        while (index < 0) {
          range--;
          index = item.y - range;
        }
        area.yp = index;
      }

      if (dir == 2) {
        let index = item.x + item.width - 1 + range;
        while (index > this.mapX - 1) {
          range--;
          index = item.x + item.width - 1 + range;
        }
        area.xk = index;
      }

      if (dir == 3) {
        let index = item.y + item.length - 1 + range;
        while (index > this.mapY - 1) {
          range--;
          index = index = item.y + item.length - 1 + range;
        }
        area.yk = index;
      }
    }
    return area;
  }

  simulate() {
    this._computeAi();
    for (let item of this.items) {
      item.temperatureImpact = (item.Ai - 1) * this.initialTemperature;
      item.temperature = item.Ai * this.initialTemperature;
      delete item.SVF;
      delete item.Fveg;
      delete item.Fbuild;
      delete item.Ai;
    }

    for (let item of this.items) {
      let yIndex = item.y;
      let yIndexEnd = item.y + item.length - 1;

      for (yIndex; yIndex <= yIndexEnd; yIndex++) {
        let xIndex = item.x + this.mapX * yIndex;
        let xIndexEnd = item.x + item.width - 1 + this.mapX * yIndex;
        for (xIndex; xIndex <= xIndexEnd; xIndex++) {
          this.grids[xIndex].temperature = item.temperature;
        }
      }

      let area = this._establishAreas(item);

      //up
      for (let y = area.yp; y < item.y; y++) {
        let factor = 1 - 0.1 * (item.y - y);
        for (let x = area.xp; x <= area.xk; x++) {
          if (
            this.grids[x + y * this.mapX].temperature == this.initialTemperature
          ) {
            this.grids[x + y * this.mapX].temperature =
              this.initialTemperature + factor * item.temperatureImpact;
          } else {
            this.grids[x + y * this.mapX].temperature =
              (this.grids[x + y * this.mapX].temperature +
                this.initialTemperature +
                factor * item.temperatureImpact) /
              2;
          }
        }
      }

      //down
      for (let y = area.yk; y >= item.y + item.length; y--) {
        let factor = 1 - 0.1 * (y - (item.y + item.length - 1));
        for (let x = area.xp; x <= area.xk; x++) {
          if (
            this.grids[x + y * this.mapX].temperature == this.initialTemperature
          ) {
            this.grids[x + y * this.mapX].temperature =
              this.initialTemperature + factor * item.temperatureImpact;
          } else {
            this.grids[x + y * this.mapX].temperature =
              (this.grids[x + y * this.mapX].temperature +
                this.initialTemperature +
                factor * item.temperatureImpact) /
              2;
          }
        }
      }
      //left
      for (let y = item.y; y < item.y + item.length; y++) {
        let factor = 1 - 0.1 * (item.x - area.xp);
        for (let x = area.xp; x < item.x; x++) {
          if (
            this.grids[x + y * this.mapX].temperature == this.initialTemperature
          ) {
            this.grids[x + y * this.mapX].temperature =
              this.initialTemperature + factor * item.temperatureImpact;
          } else {
            this.grids[x + y * this.mapX].temperature =
              (this.grids[x + y * this.mapX].temperature +
                this.initialTemperature +
                factor * item.temperatureImpact) /
              2;
          }
          factor += 0.1;
        }
      }

      //right
      for (let y = item.y; y < item.y + item.length; y++) {
        let factor = 0.9;
        for (let x = item.x + item.width; x <= area.xk; x++) {
          if (
            this.grids[x + y * this.mapX].temperature == this.initialTemperature
          ) {
            this.grids[x + y * this.mapX].temperature =
              this.initialTemperature + factor * item.temperatureImpact;
          } else {
            this.grids[x + y * this.mapX].temperature =
              (this.grids[x + y * this.mapX].temperature +
                this.initialTemperature +
                factor * item.temperatureImpact) /
              2;
          }
          factor -= 0.1;
        }
      }
    }

    for (let grid of this.grids) {
      delete grid.realHeight;
      delete grid.itemType;
    }
    //return [this.items, this.grids];
    return this.grids;
  }

  computeTemperature() {
    if (this.items.length == 0) {
      return this.initialTemperature;
    }

    this._computeAi();
    let sum = 0;
    for (let item of this.items) {
      sum += item.Ai;
    }
    sum = sum / this.items.length;

    return sum * this.initialTemperature;
  }

  _computeAi() {
    for (let item of this.items) {
      let area = this._establishAreas(item);
      this._computeSVF(item, area);
      this._computeFveg(item, area);
      this._computeFbuild(item, area);
      item.itemType == 'vegetation' || item.itemType == 'water'
        ? (item.Ai = -(2 - item.SVF - (item.Fveg + item.Fbuild)))
        : (item.Ai = 2 - item.SVF - (item.Fveg + item.Fbuild));
      if (item.itemType == 'accessory') {
        item.Ai = item.Ai / 10;
      }
      item.Ai += 1;
    }
  }

  _computeFveg(item, area) {
    let allGridsCount =
      (area.xk - area.xp + 1) * (area.yk - area.yp + 1) -
      item.length * item.width;
    let count = 0;

    for (let y = area.yp; y <= area.yk; y++) {
      for (let x = area.xp; x <= area.xk; x++) {
        if (
          this.grids[x + y * this.mapX].itemType == 'vegetation' ||
          this.grids[x + y * this.mapX].itemType == 'water'
        ) {
          count++;
        }
      }
    }
    for (let y = item.y; y < item.y + item.length; y++) {
      for (let x = item.x; x < item.x + item.width; x++) {
        if (
          this.grids[x + y * this.mapX].itemType == 'vegetation' ||
          this.grids[x + y * this.mapX].itemType == 'water'
        ) {
          count--;
        }
      }
    }
    item.Fveg = count / allGridsCount;

    if (item.itemType == 'water' || item.itemType == 'vegetation') {
      item.Fveg -= item.length * item.width * this.factor;
    }
  }

  _computeSVF(item, area) {
    let sum = -(item.length * item.width * item.realHeight);

    for (let y = area.yp; y <= area.yk; y++) {
      for (let x = area.xp; x <= area.xk; x++) {
        sum += this.grids[x + y * this.mapX].realHeight;
      }
    }
    sum =
      sum /
      ((area.xk - area.xp + 1) * (area.yk - area.yp + 1) -
        item.length * item.width);
    item.SVF = Math.cos(Math.atan((sum / this.range) * this.step));
  }

  _computeFbuild(item, area) {
    let allGridsCount =
      (area.xk - area.xp + 1) * (area.yk - area.yp + 1) -
      item.length * item.width;
    let count = 0;
    for (let y = area.yp; y <= area.yk; y++) {
      for (let x = area.xp; x <= area.xk; x++) {
        if (
          this.grids[x + y * this.mapX].itemType == 'building' ||
          this.grids[x + y * this.mapX].itemType == 'road'
        ) {
          count++;
        }
      }
    }

    for (let y = item.y; y < item.y + item.length; y++) {
      for (let x = item.x; x < item.x + item.width; x++) {
        if (
          this.grids[x + y * this.mapX].itemType == 'building' ||
          this.grids[x + y * this.mapX].itemType == 'road'
        ) {
          count--;
        }
      }
    }
    item.Fbuild = count / allGridsCount;

    if (item.itemType == 'building' || item.itemType == 'road') {
      item.Fbuild -= item.length * item.width * this.factor;
    }
  }

}

module.exports = Simulation;
