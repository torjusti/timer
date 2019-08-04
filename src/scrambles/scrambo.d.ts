/**
 * Minimal type declarations for the NPM module Scrambo.
 */

type Scrambler = '333' | '444';

declare class Scrambo {
  // Set the current scrambler type.
  type: (type: Scrambler) => Scrambo;
  // Get a scramble of the current type.
  get: () => string[];
}

declare module 'scrambo' {
  export default Scrambo;

  export {
    Scrambler,
  };
}
