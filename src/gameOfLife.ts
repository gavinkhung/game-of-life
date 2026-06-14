export const ROWS = 40;
export const COLS = 40;

export type Grid = boolean[][];

const NEIGHBOR_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const createEmptyGrid = (): Grid =>
  Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));

export const computeNextGrid = (grid: Grid): Grid =>
  grid.map((row, i) =>
    row.map((alive, j) => {
      let neighbors = 0;
      for (const [di, dj] of NEIGHBOR_OFFSETS) {
        const ni = i + di;
        const nj = j + dj;
        if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS && grid[ni][nj]) {
          neighbors++;
        }
      }
      // Live cell survives with 2-3 neighbors; dead cell is born with exactly 3.
      return alive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
    })
  );

export const toggleCellInGrid = (grid: Grid, row: number, col: number): Grid =>
  grid.map((r, i) => (i === row ? r.map((c, j) => (j === col ? !c : c)) : r));
