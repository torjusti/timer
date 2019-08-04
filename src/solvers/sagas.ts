import { takeLatest, put, select, call } from 'redux-saga/effects';
import { setSolutions } from './actions';
import { SET_SCRAMBLE, SetScrambleAction } from 'sessions/actions';
import { selectedScramblerSelector } from 'sessions/selectors';
import worker from 'workerize-loader!./getSolutions'; // eslint-disable-line

const instance = worker();

function* getSolutionsSaga(action: SetScrambleAction) {
  const scrambler = yield select(selectedScramblerSelector);

  if (scrambler === '333') {
    yield put(setSolutions(undefined));

    const solutions = yield call(async (scramble: string) =>
      await instance.getSolutions(scramble), action.payload);

    yield put(setSolutions(solutions));
  }
}

function* solversSaga() {
  yield takeLatest(SET_SCRAMBLE, getSolutionsSaga);
}

export default solversSaga;
