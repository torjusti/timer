import { all } from 'redux-saga/effects';
import statisticsSaga from './statistics';

export default function* rootSaga() {
  yield all([
    statisticsSaga(),
  ]);
}