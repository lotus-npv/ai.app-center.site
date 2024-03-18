import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_STATUSDETAIL_ALL,GET_STATUSDETAIL_ID, SET_STATUSDETAIL, UPDATE_STATUSDETAIL,DELETE_STATUSDETAIL
} from "./actionTypes"
import {
    getStatusDetailAllFail,
    getStatusDetailAllSuccess,
    getStatusDetailIdSuccess,
    getStatusDetailIdFail,
    setStatusDetailSuccess,
    setStatusDetailFail,
    updateStatusDetailSuccess,
    updateStatusDetailFail,
    deleteStatusDetailSuccess,
    deleteStatusDetailFail
} from "./actions"
                                      
import { getStatusDetailDataAll,getStatusDetailDataId ,addNewDataStatusDetail, updateDataStatusDetail, deleteDataStatusDetail } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetStatusDetailData() {
  try {
    const response = yield call(getStatusDetailDataAll);
    yield put(getStatusDetailAllSuccess(response));
  } catch (error) {
    yield put(getStatusDetailAllFail(error))
  }
}

function* fetStatusDetailDataId({payload: id}) {
  try {
    const response = yield call(getStatusDetailDataId, id);
    yield put(getStatusDetailIdSuccess(response));
  } catch (error) {
    yield put(getStatusDetailIdFail(error))
  }
}

function* onAddNewStatusDetail({ payload: data }) {
  try {
      const response = yield call(addNewDataStatusDetail, data);
      yield put(setStatusDetailSuccess(response));
      toast.success("StatusDetail Added Successfully", { autoClose: 2000 });
      yield call(refreshStatusDetailData);
  } catch (error) {
      yield put(setStatusDetailFail(error));
      toast.error("StatusDetail Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateStatusDetail({ payload: data }) {
  try {
      const response = yield call(updateDataStatusDetail, data)
      yield put(updateStatusDetailSuccess(response));
      toast.success("StatusDetail Updated Successfully", { autoClose: 2000 });
      yield call(refreshStatusDetailData);
  } catch (error) {
      yield put(updateStatusDetailFail(error))
      toast.error("StatusDetail Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteStatusDetail({ payload: id }) {
  try {
      const response = yield call(deleteDataStatusDetail, id)
      yield put(deleteStatusDetailSuccess(response));
      toast.success("StatusDetail Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteStatusDetailFail(error))
      toast.error("StatusDetail Delete Failed", { autoClose: 2000 });
  }
}

function* refreshStatusDetailData() {
  const response = yield call(getStatusDetailDataAll);
  yield put(getStatusDetailAllSuccess(response));
}
                                      

function* StatusDetailSaga() {
  yield takeEvery(GET_STATUSDETAIL_ALL, fetStatusDetailData)
  yield takeEvery(GET_STATUSDETAIL_ID, fetStatusDetailDataId)
  yield takeEvery(SET_STATUSDETAIL, onAddNewStatusDetail)
  yield takeEvery(UPDATE_STATUSDETAIL, onUpdateStatusDetail)
  yield takeEvery(DELETE_STATUSDETAIL, onDeleteStatusDetail)
}
                                      
export default StatusDetailSaga;