type Scrmabler = '3x3' | '2gll' | 'cmll' | 'corners' | 'edges' | 'lse' | 'lsll' | 'pll' | 'zbll' | 'zzls';

type Solver = 'kociemba' | 'cross' | 'eoline' | 'fb' | 'xcross';

declare module 'cube-solver' {
  // Main method for generating scrambls.
  export const scramble: (scrambler: Scrambler) => string;
  // Solve specific subset of a given cube.
  export const solve: (scramble: string, type: Solver) => string;
};
