import { all } from 'redux-saga/effects';
import recordsSaga from 'records/sagas';
import scrambleSaga from 'scrambles/sagas';

export default function* rootSaga() {
  yield all([
    recordsSaga(),
    scrambleSaga(),
  ]);
}