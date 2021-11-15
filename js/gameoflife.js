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
  let minX = state.length ? state[0][0] : 0;
  let minY = state.length ? state[0][1] : 0;
  let maxX = minX;
  let maxY = minY;
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

  return { topRight: [maxX, maxY], bottomLeft: [minX, minY] }
};

const printCells = (state) => {
  let rec = corners(state);
  let x = rec.topRight[0] - rec.bottomLeft[0] + 1;
  const offSetX = rec.bottomLeft[0];
  const offSetY = rec.bottomLeft[1];
  let y = rec.topRight[1] - rec.bottomLeft[1] + 1;
  let res = [];
  for (let i = 0; i < x; i++) {
    const line = []
    for (let j = 0; j < y; j++) {
      line.push(printCell([i + offSetX, j + offSetY], state));
    }
    if (line.length) {
      res.push(line.join(" "));
    }
  }
  //console.warn(res)
  const rrr = res.join("\n") + (res.length === 1 ? "" : "\n")
  return rrr;
};

const getNeighborsOf = ([x, y]) => {
  let res = []
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (!(i === x && j === y)) {
        res.push([i, j])
      }
    }
  }
  return res;
};
/**
 * A revoir
 * @param {*} cell 
 * @param {*} state 
 * @returns 
 */
const getLivingNeighbors = (cell, state) => {
  const neb = getNeighborsOf(cell);
  return neb.filter((cellNeb,) => {
    return printCell(cellNeb, state) == "\u25A3";
  })
};

const willBeAlive = (cell, state) => {
  // the cell has three living neighbors, or,
  // the cell is currently alive and has two living neighbors
  const livNeig = getLivingNeighbors(cell, state);
  if (livNeig.length === 3) {
    return true;
  }
  if (contains.call(state, cell) && livNeig.length === 2) {
    return true;
  }

  return false;
};

const calculateNext = (statecls) => {
  let rec = corners(statecls);
  let x = rec.topRight[0] - rec.bottomLeft[0] + 1;
  const offSetX = rec.bottomLeft[0];
  const offSetY = rec.bottomLeft[1];
  let y = rec.topRight[1] - rec.bottomLeft[1] + 1;
  let res = [];
  
  for (let i = rec.bottomLeft[0]-1; i <= rec.topRight[0]+1; i++) {
    for (let j = rec.bottomLeft[1]-1; j <= rec.topRight[1]+1; j++) {
      const cell = [i , j];
      if (willBeAlive(cell, statecls)) {
        res.push(cell);
      };
    }
  }
  return res;
};

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