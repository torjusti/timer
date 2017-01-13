/* global Cube */

const EdgeOrientation = (scramble) => {
  Cube.initSolver();

  const cube = new Cube();

  cube.move(scramble);

  cube.isSolved = () => {
    for (let e = 0; e <= 11; e += 1) {
      if (this.eo[e] !== 0) {
        return false;
      }
    }

    return true;
  };

  return cube.solve(10);
};
