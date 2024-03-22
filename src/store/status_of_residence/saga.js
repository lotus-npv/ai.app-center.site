import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_STATUSOFRESIDENCE_ALL,GET_STATUSOFRESIDENCE_ID, SET_STATUSOFRESIDENCE, UPDATE_STATUSOFRESIDENCE,DELETE_STATUSOFRESIDENCE
} from "./actionTypes"
import {
    getStatusOfResidenceAllFail,
    getStatusOfResidenceAllSuccess,
    getStatusOfResidenceIdSuccess,
    getStatusOfResidenceIdFail,
    setStatusOfResidenceSuccess,
    setStatusOfResidenceFail,
    updateStatusOfResidenceSuccess,
    updateStatusOfResidenceFail,
    deleteStatusOfResidenceSuccess,
    deleteStatusOfResidenceFail
} from "./actions"
                                      
import { getStatusOfResidenceDataAll,getStatusOfResidenceDataId ,addNewDataStatusOfResidence, updateDataStatusOfResidence, deleteDataStatusOfResidence } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetStatusOfResidenceData() {
  try {
    const response = yield call(getStatusOfResidenceDataAll);
    yield put(getStatusOfResidenceAllSuccess(response));
  } catch (error) {
    yield put(getStatusOfResidenceAllFail(error))
  }
}

function* fetStatusOfResidenceDataId({payload: id}) {
  try {
    const response = yield call(getStatusOfResidenceDataId, id);
    yield put(getStatusOfResidenceIdSuccess(response));
  } catch (error) {
    yield put(getStatusOfResidenceIdFail(error))
  }
}

function* onAddNewStatusOfResidence({ payload: data }) {
  try {
      const response = yield call(addNewDataStatusOfResidence, data);
      yield put(setStatusOfResidenceSuccess(response));
      toast.success("StatusOfResidence Added Successfully", { autoClose: 2000 });
      yield call(refreshStatusOfResidenceData);
  } catch (error) {
      yield put(setStatusOfResidenceFail(error));
      toast.error("StatusOfResidence Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateStatusOfResidence({ payload: data }) {
  try {
      const response = yield call(updateDataStatusOfResidence, data)
      yield put(updateStatusOfResidenceSuccess(response));
      toast.success("StatusOfResidence Updated Successfully", { autoClose: 2000 });
      yield call(refreshStatusOfResidenceData);
  } catch (error) {
      yield put(updateStatusOfResidenceFail(error))
      toast.error("StatusOfResidence Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteStatusOfResidence({ payload: id }) {
  try {
      const response = yield call(deleteDataStatusOfResidence, id)
      yield put(deleteStatusOfResidenceSuccess(response));
      toast.success("StatusOfResidence Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteStatusOfResidenceFail(error))
      toast.error("StatusOfResidence Delete Failed", { autoClose: 2000 });
  }
}

function* refreshStatusOfResidenceData() {
  const response = yield call(getStatusOfResidenceDataAll);
  yield put(getStatusOfResidenceAllSuccess(response));
}
                                      

function* StatusOfResidenceSaga() {
  yield takeEvery(GET_STATUSOFRESIDENCE_ALL, fetStatusOfResidenceData)
  yield takeEvery(GET_STATUSOFRESIDENCE_ID, fetStatusOfResidenceDataId)
  yield takeEvery(SET_STATUSOFRESIDENCE, onAddNewStatusOfResidence)
  yield takeEvery(UPDATE_STATUSOFRESIDENCE, onUpdateStatusOfResidence)
  yield takeEvery(DELETE_STATUSOFRESIDENCE, onDeleteStatusOfResidence)
}
                                      
export default StatusOfResidenceSaga;