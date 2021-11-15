function seed() {
  let r = [];
  for (let i = 0; i < arguments.length; i++) {
    const element = arguments[i];
    r.push(element);
  }
  return r;
}

//function same([x, y], [j, k]) {
function same(ar1, ar2) {
  return ar1 && ar2 && ar1.length === ar2.length && ar2.length == 2 && ar1[0] === ar2[0] && ar1[1] === ar2[1];
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  if (!this.findIndex) {
    return false;
  }
  return this.findIndex((c) => {
    return same(c, cell);
  }) >= 0;
}

const printCell = (cell, state) => {
  if (contains.call(state, cell)) {
    return "\u25A3";
  } else {
    return "\u25A2";
  }
};

const corners = (state = []) => {
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < state.length; i++) {
    const element = state[i];
    const x = element[0];
    const y = element[1];
    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
    if (minX > x) {
      minX = x;
    }
    if (minY > y) {
      minY = y;
    }
  }
  minX = minX === Number.MAX_VALUE ? 0 : minX;
  minY = minY === Number.MAX_VALUE ? 0 : minX;
  return { topRight: [maxX, maxY], bottomLeft: [minX, minY] }
};

const printCells = (state) => { 
  
};

const getNeighborsOf = ([x, y]) => { };

const getLivingNeighbors = (cell, state) => { };

const willBeAlive = (cell, state) => { };

const calculateNext = (state) => { };

const iterate = (state, iterations) => { };

const main = (pattern, iterations) => { };

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4]
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3]
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2]
  ]
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log("Usage: node js/gameoflife.js rpentomino 50");
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;