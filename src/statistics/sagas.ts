import { takeLatest, select, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from 'sessions/actions';
import { resultsSelector } from 'results/selectors';
import { CubingStatistics } from './cubingStatistics';
import worker from 'workerize-loader!./cubingStatistics'; // eslint-disable-line
import { statisticsSelector } from './selectors';
import { selectedSessionSelector } from 'sessions/selectors';

const instance = worker();

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

function* computeStatisticsSaga() {
  const results = yield select(resultsSelector);
  const { id } = yield select(selectedSessionSelector);
  const statistics = yield call(async () => await instance.calculateStatistics(results));
  
  yield put({ type: actions.SET_STATISTICS, payload: { id, statistics }});
}

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

function* statisticsSaga() {
  let oldStatistics = yield select(statisticsSelector);

  yield all([
    takeLatest([actions.CREATE_SESSION, actions.DELETE_SESSION, actions.SET_SESSION], function* () {
      oldStatistics = yield select(statisticsSelector);
    }),
    
    takeLatest([actions.ADD_RESULT, actions.CLEAR_SESSION, actions.DELETE_RESULTS, 
      actions.SET_PENALTY], computeStatisticsSaga),

    takeLatest(actions.SET_STATISTICS, function* () {
      yield recordNotificationSaga(oldStatistics);
      oldStatistics = yield select(statisticsSelector);
    }),
  ]);
}

export default statisticsSaga;
