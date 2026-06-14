import { Grid } from "../gameOfLife";
import clear from "./clear.json";
import glider from "./glider.json";
import pulse from "./pulse.json";

export type PatternName = "glider" | "pulse" | "clear";

const patterns: Record<PatternName, boolean[][]> = {
  glider,
  pulse,
  clear,
};

// Clone the imported matrix so simulation updates never mutate the source JSON.
export const patternToGrid = (name: PatternName): Grid =>
  patterns[name].map((row) => [...row]);

export default patterns;
