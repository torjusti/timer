import moment from 'moment';
import { solve } from 'cube-solver';
import store from 'store';
import { getAlgorithms } from 'selectors/sets';
import { setCurrentAlgorithm } from 'actions/sets';
import stripRotations from './stripRotations';

const today = new Date();

today.setHours(0, 0, 0, 0);

export const defaultCard = {
  date: today,
  interval: 0,
  repetitions: 0,
  ease: 2.5,
};

export const interval = (card, grade) => {
  const updated = Object.assign({}, card);

  if (grade < 3) {
    updated.repetitions = 0;
    updated.interval = 0;
  } else {
    updated.ease = Math.max(card.ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)), 1.3);
    updated.repetitions = card.repetitions + 1;

    switch (updated.repetitions) {
      case 1:
        updated.interval = 1;
        break;

      case 2:
        updated.interval = 6;
        break;

      default:
        updated.interval = Math.round((card.repetitions - 1) * card.ease);
        break;
    }
  }

  if (grade === 3) {
    updated.interval = 0;
  }

  updated.date = new Date();
  updated.date.setDate(today.getDate() + updated.interval);

  return updated;
};

export const getRemaindingAlgorithms = () => getAlgorithms(store.getState())
  .filter(alg => moment(alg.date).isSameOrBefore(moment(), 'day'));

export const getScramble = () => {
  const algorithms = getRemaindingAlgorithms();

  if (algorithms.length) {
    const random = algorithms[Math.floor(Math.random() * algorithms.length)];
    store.dispatch(setCurrentAlgorithm(random.id));
    return solve(stripRotations(random.algorithm));
  }

  return null;
};
