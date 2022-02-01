import React, { FC, useState, useEffect } from "react";

interface AppProps {}

const X = 80;
const Y = 40;
const neighboringCells: number[][] = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [-1, 0],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const App: FC<AppProps> = ({}) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const [grid, setGrid] = useState<boolean[][]>(() => {
    const rows: boolean[][] = [];
    for (let i = 0; i < Y; i++) {
      const col: boolean[] = [];
      for (let j = 0; j < X; j++) {
        col.push(false);
      }
      rows.push(col);
    }
    return rows;
  });

  useEffect(() => {
    let interval: number | undefined = setInterval(() => {
      if (isActive) {
        const rows: boolean[][] = [];
        for (let i = 0; i < Y; i++) {
          const col: boolean[] = [];
          for (let j = 0; j < X; j++) {
            let neighbors = 0;

            for (let k = 0; k < neighboringCells.length; k++) {
              const i2: number = i + neighboringCells[k][0];
              const j2: number = j + neighboringCells[k][1];
              if (i2 >= 0 && i2 < Y && j2 >= 0 && j2 < X) {
                if (grid[i2][j2]) {
                  neighbors++;
                }
              }
            }

            if (grid[i][j]) {
              if (neighbors == 2 || neighbors == 3) {
                col.push(true);
              } else {
                col.push(false);
              }
            } else {
              if (neighbors == 3) {
                col.push(true);
              } else {
                col.push(false);
              }
            }
          }
          rows.push(col);
        }
        setGrid(rows);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, grid]);

  const toggleCell = (i2: number, j2: number, val: boolean): void => {
    const newGrid: boolean[][] = [];
    for (let i = 0; i < Y; i++) {
      const col: boolean[] = [];
      for (let j = 0; j < X; j++) {
        if (i == i2 && j == j2) {
          col.push(!val);
        } else {
          col.push(grid[i][j]);
        }
      }
      newGrid.push(col);
    }
    setGrid(newGrid);
  };

  return (
    <>
      <div className="">
        <h1>Conway's Game of Life</h1>
      </div>
      <div className="">
        {grid.map((row, i) => (
          <div className="flex">
            {row.map((col, j) => (
              <div
                className={`border w-4 h-4 ${col ? "bg-gray-500" : "bg-white"}`}
                onClick={() => toggleCell(i, j, col)}
              >
                {/* {`${i} ${j} ${col}`} */}
                {""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="">
        <button onClick={() => setIsActive(!isActive)}>toggle</button>
      </div>
    </>
  );
};

export default App;
