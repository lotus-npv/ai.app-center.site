import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { uploadFileSuccess, uploadFileFailure } from './actions';

function* uploadSaga(action) {
  try {
    const formData = new FormData();
    formData.append('file', action.payload);

    const response = yield call(axios.post, 'https://api.lotusocean-jp.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    yield put(uploadFileSuccess(response.data));
  } catch (error) {
    yield put(uploadFileFailure(error.message));
  }
}

function* UploadFileSaga() {
    yield takeEvery('UPLOAD_FILE_REQUEST', uploadSaga);
  }

export default UploadFileSaga;