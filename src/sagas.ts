import { all } from 'redux-saga/effects';
import scrambleSaga from 'scrambles/sagas';
import solversSaga from 'solvers/sagas';
import recordsSaga from 'records/sagas';

export default function* rootSaga() {
  yield all([scrambleSaga(), solversSaga(), recordsSaga()]);
}
