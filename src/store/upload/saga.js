import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


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



function* onUploadFile({ payload: data }) {
  try {
      const response = yield call(uploadDataAvata, data);
      yield put(uploadFileSuccess(response));
      toast.success("Upload file Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(uploadFileFail(error));
      toast.error("Upload file Failed", { autoClose: 2000 });
  }
}

                                    
function* UploadFileSaga() {
  yield takeEvery(UPLOAD_FILE, onUploadFile)
}
                                      
export default UploadFileSaga;