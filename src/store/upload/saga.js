import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";
import axios from 'axios';
// Login Redux States
import {
  UPLOAD_FILE,
} from "./actionTypes"
import {
    uploadFileSuccess,
    uploadFileFail
} from "./actions"
                                      
import { uploadDataAvata } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";



function* onUploadFile(action) {
  const formData = action.payload;
  try {
    const response = yield call(axios.post, 'https://api.lotusocean-jp.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      yield put(uploadFileSuccess(response.data.filename));
      toast.success("Upload file Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(uploadFileFail(error.message));
      toast.error("Upload file Failed", { autoClose: 2000 });
  }
}

                                    
function* UploadFileSaga() {
  yield takeLatest(UPLOAD_FILE, onUploadFile)
}
                                      
export default UploadFileSaga;