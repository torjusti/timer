import { takeLatest, call, put, select } from 'redux-saga/effects';
import { selectedScramblerSelector } from 'sessions/selectors';
import { SELECT_SCRAMBLER, ADD_RESULT, setScramble, CREATE_SESSION, SelectScramblerAction } from 'sessions/actions';
import generateScramble from 'scrambles/generateScramble';

function* updateScramble() {
  const scrambler = yield select(selectedScramblerSelector);
  const scramble = yield call(generateScramble, scrambler);
  yield put(setScramble(scramble));
}

function* scrambleSaga() {
  yield takeLatest([ADD_RESULT, CREATE_SESSION], updateScramble);

  let previousScrambler = yield select(selectedScramblerSelector);

  yield takeLatest(SELECT_SCRAMBLER, function* (action: SelectScramblerAction) {
    if (action.payload !== previousScrambler) {
      yield updateScramble();
    }

    previousScrambler = action.payload;
  });
}

export default scrambleSaga;
