
import { solve } from 'cube-solver';
      
export const getSolutions = (scramble: string) => ({
  eoline: solve(scramble, 'eoline'),
  cross: solve(scramble, 'cross'),
  xcross: solve(scramble, 'xcross'),
  fb: solve(scramble, 'fb'),
});
