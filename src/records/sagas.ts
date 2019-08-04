import { takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { ADD_RESULT } from 'sessions/actions';
import { CubingStatistics } from 'statistics/cubingStatistics';
import { statisticsSelector } from 'statistics/selectors';

/**
 * Formats an array as a human-readable comma-separated string.
 */
const arrayToString = (array: string[]): string => {
  if (array.length === 1) {
    return array[0];
  }

  const last = array.slice().pop();

  return `${array.slice(0, array.length - 1).join(', ')} and ${last}`;
};

const descriptions: { [key in keyof Partial<CubingStatistics>]: string } = {
  bestSingle: 'single',
  bestAo5: 'average of 5',
  bestAo12: 'average of 12',
  bestAo100: 'average of 100',
};

function* recordNotificationSaga(oldStatistics: CubingStatistics) {
  const statistics = yield select(statisticsSelector);

  const records = (Object.keys(descriptions) as (keyof CubingStatistics)[]).filter(key => {
    const oldStatistic = oldStatistics[key];
    return statistics[key] && (oldStatistic === undefined || statistics[key] < oldStatistic);
  }).map(record => descriptions[record] as string);

  if (records.length > 0) {
    toast(`New personal best ${arrayToString(records)}`);
  }
}

function* recordsSaga() {
  let oldStatistics = yield select(statisticsSelector);

  yield takeLatest(ADD_RESULT, function* () {
    yield recordNotificationSaga(oldStatistics);
    oldStatistics = yield select(statisticsSelector);
  });
}

export default recordsSaga;
