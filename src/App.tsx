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
      <div className="flex flex-col md:flex-row space-y-4">
        <article className="prose prose-gray lg:prose-md max-w-none flex-1">
          <h1>Conway's Game of Life</h1>

          <h3>About</h3>
          <p>
            This is a zero-player game that models underpopulation,
            overpopulation, and reproduction using a grid of cells. The cells
            are either alive or dead. The state of each cell is determined by
            the states of its neighbors.
          </p>

          <h3>Rules</h3>
          <ul>
            <li>Live cells with two or three cells survive.</li>
            <li>Dead cells with three neighbors become alive.</li>
            <li>
              Any other live cells die. Any other dead cell stays dead
            </li>
          </ul>

          <h3>Options</h3>
          <div className="not-prose flex flex-row space-x-2">
            <button className={buttonClass} onClick={toggleRunning}>
              Toggle {isActive ? "Off" : "On"}
            </button>
            <button className={buttonClass} onClick={() => loadPattern("clear")}>
              Clear
            </button>
          </div>

          <h2>Patterns</h2>
          <div className="not-prose flex flex-row space-x-2">
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
        </article>

        <div className="flex-1 flex justify-center items-center">
          <Grid grid={grid} onToggleCell={toggleCell} />
        </div>
      </div>
    </div>
  );
};

export default App;
