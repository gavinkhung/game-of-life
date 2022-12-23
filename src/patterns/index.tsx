import clear from "./clear.json";
import glider from "./glider.json";
import pulse from "./pulse.json";

interface patternType {
  [key: string]: boolean[][];
  glider: boolean[][];
  pulse: boolean[][];
  clear: boolean[][];
}

const patterns: patternType = { glider: glider, pulse: pulse, clear: clear };

export default patterns;
