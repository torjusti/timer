import { getEdgeOrientationFromIndex, getCornerOrientationFromIndex } from './Coordinates';

export const factorial = n => {
  if (n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

// Cartesian product.
export const cartesian = arg => {
  var r = [], max = arg.length-1;
   function helper(arr, i) {
       for (var j=0, l=arg[i].length; j<l; j++) {
           var a = arr.slice(0); // clone arr
           a.push(arg[i][j]);
           if (i==max)
               r.push(a);
           else
               helper(a, i+1);
       }
   }
   helper([], 0);
   return r;
};

// Returns all indexes in the given space where all given
// pieces are oriented correctly.
export const getCorrectEdgeOrientations = (size, pieces) => {
  const indexes = [];

  for (let i = 0; i < size; i++) {
    const flips = getEdgeOrientationFromIndex(i);

    if (pieces.every(piece => flips[piece] === 0)) {
      indexes.push(i);
    }
  }

  return indexes;
};

// Returns all indexes in the given space where all given
// pieces are oriented correctly.
export const getCorrectCornerOrientations = (size, pieces) => {
  const indexes = [];

  for (let i = 0; i < size; i++) {
    const twists = getCornerOrientationFromIndex(i);

    if (pieces.every(piece => twists[piece] === 0)) {
      indexes.push(i);
    }
  }

  return indexes;
};
