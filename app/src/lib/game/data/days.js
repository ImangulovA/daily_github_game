// ---------------------------------------------------------------------------
// DEMO day data for the example game (Lights Out 3x3). REPLACE this file in your
// fork with your own puzzle data + loader.
//
// Each day is defined by a `scramble`: a list of cell presses applied to an
// all-off board. Because every press is reversible, a scrambled board is always
// solvable (press the same cells again to solve it). Storing the scramble — not
// the raw board — keeps days trivially authorable and guaranteed-solvable.
// ---------------------------------------------------------------------------

// Cell index layout (3x3):
//   0 1 2
//   3 4 5
//   6 7 8
const NEIGHBORS = [
  [0, 1, 3],
  [0, 1, 2, 4],
  [1, 2, 5],
  [0, 3, 4, 6],
  [1, 3, 4, 5, 7],
  [2, 4, 5, 8],
  [3, 6, 7],
  [4, 6, 7, 8],
  [5, 7, 8]
];

export function press(board, cell) {
  const next = board.slice();
  for (const i of NEIGHBORS[cell]) next[i] = !next[i];
  return next;
}

function boardFromScramble(scramble) {
  let board = new Array(9).fill(false);
  for (const cell of scramble) board = press(board, cell);
  return board;
}

// day index -> scramble presses. Keys may be negative (pre-anchor test days).
const SCRAMBLES = {
  '-1': [4], // single-press: gentle pre-launch test day
  0: [0, 4, 8],
  1: [1, 3, 5, 7],
  2: [0, 2, 6, 8, 4],
  3: [2, 4, 5, 1]
};

// Public API consumed by ../index.js
export function dayIndexes() {
  return Object.keys(SCRAMBLES).map(Number);
}

export function loadDay(idx) {
  const scramble = SCRAMBLES[idx];
  if (!scramble) return null;
  return {
    board: boardFromScramble(scramble),
    par: scramble.length // a reasonable target number of moves
  };
}
