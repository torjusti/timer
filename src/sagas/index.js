import { all } from 'redux-saga/effects';
import statisticsSaga from './statistics';
import scrambleSaga from './scrambles';

export default function* rootSaga() {
  yield all([
    statisticsSaga(),
    scrambleSaga(),
  ]);
}