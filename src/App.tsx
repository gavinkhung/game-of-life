import { FC, useEffect, useState } from "react";
import patterns from "./patterns";

interface AppProps {}

const X = 40;
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
        if (patterns["glider"][i][j]) {
          col.push(true);
        } else {
          col.push(false);
        }
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
    }, 100);
    return () => clearInterval(interval);
  }, [isActive, grid]);

  const setPattern = (name: string): void => {
    if (name.length && patterns[name].length) {
      const rows: boolean[][] = [];
      for (let i = 0; i < Y; i++) {
        const col: boolean[] = [];
        for (let j = 0; j < X; j++) {
          if (patterns[name][i][j]) {
            col.push(true);
          } else {
            col.push(false);
          }
        }
        rows.push(col);
      }
      setGrid(rows);
    }
  };

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
    <div className="flex flex-col w-screen h-screen p-6">
      <div className="">
        <h1 className="pb-6 text-4xl lg:text-5xl font-bold leading-tight text-black">
          Conway's Game of Life
        </h1>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black">
              About
            </h2>
            <p className="text-lg lg:text-xl font-normal leading-tight text-gray-800">
              This is a zero-player game that models underpopulation,
              overpopulation, and reproduction using a grid of cells. The cells
              are either alive or dead. The state of each cell is determined by
              the states of its neighbors.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black">
              Rules
            </h2>
            <ul className="list-disc list-inside">
              <li className="text-lg lg:text-xl font-normal leading-tight text-gray-800">
                Live cells with two or three cells survive.
              </li>
              <li className="text-lg lg:text-xl font-normal leading-tight text-gray-800">
                Dead cells with three neighbors become alive.
              </li>
              <li className="text-lg lg:text-xl font-normal leading-tight text-gray-800">
                Any other live cells die. Any other dead cell stays dead
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black">
              Options
            </h2>
            <div className="flex flex-row space-x-2">
              <button
                className="text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900"
                onClick={() => {
                  setIsActive(!isActive);
                  console.log(grid);
                }}
              >
                Toggle {isActive ? "Off" : "On"}
              </button>
              <button
                className="text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900"
                onClick={() => {
                  setPattern("clear");
                }}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black">
              Patterns
            </h2>
            <div className="flex flex-row space-x-2">
              <button
                className="text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900"
                onClick={() => {
                  setPattern("glider");
                }}
              >
                Gosper Glider Gun
              </button>
              <button
                className="text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900"
                onClick={() => {
                  setPattern("pulse");
                }}
              >
                Pulse
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="">
            {grid.map((row, i) => (
              <div className="flex">
                {row.map((col, j) => (
                  <div
                    className={`border w-4 h-4 ${
                      col ? "bg-blue-800 opacity-50" : "bg-white"
                    }`}
                    onClick={() => toggleCell(i, j, col)}
                  >
                    {""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
