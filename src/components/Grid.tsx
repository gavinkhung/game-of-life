import { FC } from "react";
import { Grid as GridType } from "../gameOfLife";
import Cell from "./Cell";

interface GridProps {
  grid: GridType;
  onToggleCell: (row: number, col: number) => void;
}

const Grid: FC<GridProps> = ({ grid, onToggleCell }) => (
  <div>
    {grid.map((row, i) => (
      <div className="flex" key={i}>
        {row.map((alive, j) => (
          <Cell
            key={`${i}-${j}`}
            alive={alive}
            row={i}
            col={j}
            onToggle={onToggleCell}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Grid;
