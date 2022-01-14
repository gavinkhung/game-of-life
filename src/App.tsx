import React, { FC, useState, useEffect } from "react";

interface AppProps {}

const X = 20;
const Y = 25;

const App: FC<AppProps> = ({}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

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
    let interval: number | undefined;
    if (isActive) {
      interval = setInterval(() => {
        // setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    // if (seconds <= 0) {
    //   setIsActive(false);
    // }
    return () => clearInterval(interval);
  }, []);

  const toggleCell = (i2: number, j2: number, val: boolean) => {
    const newGrid: boolean[][] = [];
    for (let i = 0; i < Y; i++) {
      const col: boolean[] = [];
      for (let j = 0; j < X; j++) {
        if (i == i2 && j == j2) {
          col.push(!val);
        } else {
          if (grid[i][j]) {
            col.push(true);
          } else {
            col.push(false);
          }
          // col.push(grid[i][j]);
        }
      }
      newGrid.push(col);
    }
    setGrid(newGrid);
  };

  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>toggle</button>
      <div className="">
        {grid.map((row, i) => (
          <div className="flex">
            {row.map((col, j) => (
              <div
                className={`flex-1 border transition ease-in ${
                  col ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={() => toggleCell(i, j, col)}
              >
                {/* {`${i} ${j} ${col}`} */}
                {"_"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
