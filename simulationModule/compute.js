class Simulation {
  constructor(
    items,
    initialTemperature = 21,
    step = 0.5,
    mapX = 100,
    mapY = 100,
    range = 7,
    factor = 0.0001
  ) {
    this.items = items;
    this.initialTemperature = initialTemperature;
    this.step = step;
    this.mapX = mapX;
    this.mapY = mapY;
    this.range = range;
    this.factor = factor;

    this.grids = this.prepareGrid();
  }

  prepareGrid() {
    let grids = [];

    for (let i = 0; i < this.mapY; i++) {
      for (let j = 0; j < this.mapX; j++) {
        grids.push({
          x: j,
          y: i,
          realHeight: 0,
          itemType: 'vegetation',
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

  establishAreas(item) {
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
    this.computeAi();
    for (let item of this.items) {
      item.temperatureImpact = (item.Ai - 1) * this.initialTemperature;
    }
    return this.items;
  }

  computeTemperature() {
    this.computeAi();
    let sum = 0;
    for (let item of this.items) {
      sum += item.Ai;
    }
    sum = sum / this.items.length;

    return sum * this.initialTemperature;
  }

  computeAi() {
    for (let item of this.items) {
      let area = this.establishAreas(item);
      this.computeSVF(item, area);
      this.computeFveg(item, area);
      this.computeFbuild(item, area);
      item.itemType == 'vegetation' || item.itemType == 'water'
        ? (item.Ai = -(2 - item.SVF - (item.Fveg + item.Fbuild)))
        : (item.Ai = 2 - item.SVF - (item.Fveg + item.Fbuild));
      if (item.itemType == 'accessory') {
        item.Ai = item.Ai / 10;
      }
      item.Ai += 1;
    }
  }

  computeFveg(item, area) {
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

  computeSVF(item, area) {
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
    item.SVF = Math.cos(Math.atan(sum / this.range));
    // }
  }

  computeFbuild(item, area) {
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
