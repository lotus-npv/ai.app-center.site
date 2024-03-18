import { takeEvery } from 'redux-saga/effects';
import uploadFileSaga from './sagas';

function* rootSaga() {
  yield takeEvery('UPLOAD_FILE_REQUEST', uploadFileSaga);
}

export default rootSaga;