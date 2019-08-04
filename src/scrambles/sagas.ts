import { takeLatest, call, put, select } from 'redux-saga/effects';
import { selectedScramblerSelector } from 'sessions/selectors';
import { SELECT_SCRAMBLER, ADD_RESULT, setScramble, CREATE_SESSION } from 'sessions/actions';
import generateScramble from 'scrambles/generateScramble';

function* updateScramble() {
  const scrambler = yield select(selectedScramblerSelector);
  const scramble = yield call(generateScramble, scrambler);
  yield put(setScramble(scramble));
}

function* scrambleSaga() {
  yield takeLatest([SELECT_SCRAMBLER, ADD_RESULT, CREATE_SESSION], updateScramble);
}

export default scrambleSaga;
