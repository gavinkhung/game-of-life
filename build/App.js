import React, {useState, useEffect} from "./_snowpack/pkg/react.js";
import patterns from "./patterns/index.js";
const X = 40;
const Y = 40;
const neighboringCells = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [-1, 0],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1]
];
const App = ({}) => {
  const [isActive, setIsActive] = useState(true);
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < Y; i++) {
      const col = [];
      for (let j = 0; j < X; j++) {
        col.push(false);
      }
      rows.push(col);
    }
    return rows;
  });
  useEffect(() => {
    let interval = setInterval(() => {
      if (isActive) {
        const rows = [];
        for (let i = 0; i < Y; i++) {
          const col = [];
          for (let j = 0; j < X; j++) {
            let neighbors = 0;
            for (let k = 0; k < neighboringCells.length; k++) {
              const i2 = i + neighboringCells[k][0];
              const j2 = j + neighboringCells[k][1];
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
  const setPattern = (name) => {
    if (name.length && patterns[name].length) {
      const rows = [];
      for (let i = 0; i < Y; i++) {
        const col = [];
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
  const toggleCell = (i2, j2, val) => {
    const newGrid = [];
    for (let i = 0; i < Y; i++) {
      const col = [];
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-screen h-screen overflow-hidden p-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: ""
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "pb-6 text-4xl lg:text-5xl font-bold leading-tight text-black"
  }, "Conway's Game of Life")), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex-1 space-y-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "space-y-2"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black"
  }, "About"), /* @__PURE__ */ React.createElement("p", {
    className: "text-lg lg:text-xl font-normal leading-tight text-gray-800"
  }, "This is a zero-player game that models underpopulation, overpopulation, and reproduction using a grid of cells. The cells are either alive or dead. The state of each cell is determined by the states of its neighbours.")), /* @__PURE__ */ React.createElement("div", {
    className: "space-y-2"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black"
  }, "Rules"), /* @__PURE__ */ React.createElement("ul", {
    className: "list-disc list-inside"
  }, /* @__PURE__ */ React.createElement("li", {
    className: "text-lg lg:text-xl font-normal leading-tight text-gray-800"
  }, "Live cells with two or three cells survive."), /* @__PURE__ */ React.createElement("li", {
    className: "text-lg lg:text-xl font-normal leading-tight text-gray-800"
  }, "Dead cells with three neighbors become alive."), /* @__PURE__ */ React.createElement("li", {
    className: "text-lg lg:text-xl font-normal leading-tight text-gray-800"
  }, "Any other live cells die. Any other dead cell stays dead"))), /* @__PURE__ */ React.createElement("div", {
    className: "space-y-2"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black"
  }, "Options"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row space-x-2"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900",
    onClick: () => {
      setIsActive(!isActive);
      console.log(grid);
    }
  }, "Toggle ", isActive ? "Off" : "On"), /* @__PURE__ */ React.createElement("button", {
    className: "text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900",
    onClick: () => {
      setPattern("clear");
    }
  }, "Clear"))), /* @__PURE__ */ React.createElement("div", {
    className: "space-y-2"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "pb-1 text-2xl lg:text-3xl font-medium leading-tight text-black"
  }, "Patterns"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row space-x-2"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900",
    onClick: () => {
      setPattern("glider");
    }
  }, "Gosper Glider Gun"), /* @__PURE__ */ React.createElement("button", {
    className: "text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900",
    onClick: () => {
      setPattern("pulse");
    }
  }, "Pulse")))), /* @__PURE__ */ React.createElement("div", {
    className: "flex-1 flex justify-center items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: ""
  }, grid.map((row, i) => /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, row.map((col, j) => /* @__PURE__ */ React.createElement("div", {
    className: `border w-4 h-4 ${col ? "bg-blue-800 opacity-50" : "bg-white"}`,
    onClick: () => toggleCell(i, j, col)
  }, ""))))))));
};
export default App;
