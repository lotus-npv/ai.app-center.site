import { takeLatest, call, put } from 'redux-saga/effects';
import { UPLOAD_IMAGE_REQUEST, uploadImageSuccess, uploadImageFailure } from './actions';
import axios from 'axios';

function* uploadImage(action) {
  try {
    const formData = action.payload;
    const response = yield call(axios.post, 'https://api.lotusocean-jp.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(uploadImageSuccess(response.data.filename));
  } catch (error) {
    yield put(uploadImageFailure(error.message));
  }
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

export default watchUploadImage;
