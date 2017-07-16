// Returns true if we are able to parse this sequence.
export const validateSequence = sequence => {
  if (sequence.trim().length === 0) {
    return false;
  }

  return sequence.trim().split(' ').every(part => {
    if (part.trim().length === 0) {
      return true;
    }

    if (!part.matches(/^[FRUBLD]{1}[2']?$/)) {
      return false;
    }

    return true;
  });
};

export const parseScramble = scramble => {
  const moves = [];

  scramble.trim().split(' ').forEach(move => {
    if (move.trim().length > 0) {
      const moveNum = 'FRUBLD'.indexOf(move.charAt(0));
      let pow = 0;

      if (move.length === 2) {
        if (move.charAt(1) === '2') {
          pow = 1;
        } else if (move.charAt(1) === '\'') {
          pow = 2;
        }
      }

      moves.push(moveNum * 3 + pow);
    }
  });

  return moves;
};

export const combineSequences = (first, last) => {
    return first.trim() + ' ' + last.trim();
};

export const formatMoveSequence = moves => {
  let sequence = '';

  moves.forEach(move => {
    sequence += ' ';
    sequence += 'FRUBLD'.charAt(Math.floor(move / 3));

    switch (move % 3) {
      case 1:
        sequence += '2';
        break;
      case 2:
        sequence += '\'';
        break;
      default:
    }
  });

  return sequence;
};
