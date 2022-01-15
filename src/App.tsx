import React, { FC, useState, useEffect } from "react";

interface AppProps {}

const X = 20;
const Y = 25;
const neighboringCells:number[][] = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [0, -1],
  [-1, -1],
];

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
        const rows: boolean[][] = [];
        for (let i = 0; i < Y; i++) {
          const col: boolean[] = [];
          for (let j = 0; j < X; j++) {
            let neighbors = 0;

            for(let k=0; k<neighboringCells.length; k++){
              const i2:number = i+neighboringCells[k][0];
              const j2: number = j+neighboringCells[k][1];
              
              if(i2>=0 && i2<X && j2>=0 && j2<Y){
                if(grid[i2][j2]){
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
      }, 1000);
    }
    () => clearInterval(interval);
  }, [isActive, grid]);

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
