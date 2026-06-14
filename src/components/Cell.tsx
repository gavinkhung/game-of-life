import { FC, memo } from "react";

interface CellProps {
  alive: boolean;
  row: number;
  col: number;
  onToggle: (row: number, col: number) => void;
}

const Cell: FC<CellProps> = ({ alive, row, col, onToggle }) => (
  <div
    className={`border w-4 h-4 cursor-pointer ${
      alive ? "bg-blue-800 opacity-50" : "bg-white"
    }`}
    onClick={() => onToggle(row, col)}
  />
);

export default memo(Cell);
