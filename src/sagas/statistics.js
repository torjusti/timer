import { takeLatest, put } from 'redux-saga/effects';

import {
  NEW_RECORD, showRecordMessage,
  hideRecordMessage,  
} from '../actions/statistics';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* newRecord(action) {
  yield put(showRecordMessage(action.records));
  yield delay(5000);
  yield put(hideRecordMessage());
}

export default function* statisticsSaga() {
  yield takeLatest(NEW_RECORD, newRecord);
}