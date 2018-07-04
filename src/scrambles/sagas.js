import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { selectedScramblerSelector } from 'sessions/selectors';
import { SELECT_SCRAMBLER, setScramble } from './actions';
import { ADD_RESULT } from 'results/actions';
import generateScramble from 'scrambles/generateScramble';

function* updateScramble() {
  const scrambler = yield select(selectedScramblerSelector);
  const scramble = yield call(generateScramble, scrambler);
  yield put(setScramble(scramble));
}

function* scrambleSaga() {
  yield all([
    takeLatest(SELECT_SCRAMBLER, updateScramble),
    takeLatest(ADD_RESULT, updateScramble),
  ]);
}

export default scrambleSaga;
