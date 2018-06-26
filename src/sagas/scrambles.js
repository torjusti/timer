import { takeLatest, call, put, all,  select } from 'redux-saga/effects';
import { selectedScramblerSelector } from 'selectors/sessions';
import { SELECT_SCRAMBLER, setScramble } from 'actions/scrambles';
import { ADD_RESULT } from 'actions/results';
import { generateScramble } from 'utils/scrambles';

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