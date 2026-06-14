import { useCallback, useEffect, useState } from "react";
import { computeNextGrid, Grid, toggleCellInGrid } from "../gameOfLife";
import { PatternName, patternToGrid } from "../patterns";

const TICK_MS = 100;

export const useGameOfLife = (initialPattern: PatternName) => {
  const [isActive, setIsActive] = useState(true);
  const [grid, setGrid] = useState<Grid>(() => patternToGrid(initialPattern));

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setGrid((prev) => computeNextGrid(prev));
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleRunning = useCallback(() => setIsActive((active) => !active), []);

  const loadPattern = useCallback(
    (name: PatternName) => setGrid(patternToGrid(name)),
    []
  );

  const toggleCell = useCallback(
    (row: number, col: number) =>
      setGrid((prev) => toggleCellInGrid(prev, row, col)),
    []
  );

  return { grid, isActive, toggleRunning, loadPattern, toggleCell };
};
