import { FC } from "react";
import Grid from "./components/Grid";
import { useGameOfLife } from "./hooks/useGameOfLife";

const App: FC = () => {
  const { grid, isActive, toggleRunning, loadPattern, toggleCell } =
    useGameOfLife("glider");

  const buttonClass =
    "text-lg py-2 px-4 rounded-md bg-gray-200 hover:shadow-sm font-normal leading-tight text-gray-800 hover:text-gray-900";

  return (
    <div className="flex flex-col w-screen h-screen p-6">
      <div>
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
              <button className={buttonClass} onClick={toggleRunning}>
                Toggle {isActive ? "Off" : "On"}
              </button>
              <button className={buttonClass} onClick={() => loadPattern("clear")}>
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
                className={buttonClass}
                onClick={() => loadPattern("glider")}
              >
                Gosper Glider Gun
              </button>
              <button className={buttonClass} onClick={() => loadPattern("pulse")}>
                Pulse
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Grid grid={grid} onToggleCell={toggleCell} />
        </div>
      </div>
    </div>
  );
};

export default App;
