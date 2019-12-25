import { solve, initialize } from 'cube-solver';

initialize('xcross');
initialize('eoline');
initialize('cross');
initialize('fb');

export const getSolutions = (scramble: string) => ({
  eoline: solve(scramble, 'eoline'),
  cross: solve(scramble, 'cross'),
  xcross: solve(scramble, 'xcross'),
  fb: solve(scramble, 'fb'),
});
