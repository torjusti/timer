import { solve } from 'cube-solver';

const solveScramble = event => {
  const scramble = JSON.parse(event.data).scramble;

  console.log('solving!!!', solve);
  postMessage(
    JSON.stringify({
      Cross: solve(scramble, 'cross'),
      EOLine: solve(scramble, 'eoline'),
      FirstBlock: solve(scramble, 'fb'),
      XCross: solve(scramble, 'xcross'),
      scramble, // Used to re-render when the scramble changes.
    }),
  );
};

self.addEventListener('message', solveScramble);
