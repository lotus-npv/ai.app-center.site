import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_VIOLATE_ALL,GET_VIOLATE_ID, SET_VIOLATE, UPDATE_VIOLATE,DELETE_VIOLATE,GET_VIOLATE_USERID
} from "./actionTypes"
import {
    getViolateAllFail,
    getViolateAllSuccess,
    getViolateUserIdFail,
    getViolateUserIdSuccess,
    getViolateIdSuccess,
    getViolateIdFail,
    setViolateSuccess,
    setViolateFail,
    updateViolateSuccess,
    updateViolateFail,
    deleteViolateSuccess,
    deleteViolateFail
} from "./actions"

import { getViolateListAllSuccess } from "store/actions";
                                      
import { getViolateDataAll,getViolateDataId ,addNewDataViolate, updateDataViolate, deleteDataViolate, getViolateListDataAll, getViolateDataUserId } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetViolateData() {
  try {
    const response = yield call(getViolateDataAll);
    yield put(getViolateAllSuccess(response));
  } catch (error) {
    yield put(getViolateAllFail(error))
  }
}

function* fetViolateDataUserId({payload: id}) {
  try {
    const response = yield call(getViolateDataUserId, id);
    yield put(getViolateUserIdSuccess(response));
  } catch (error) {
    yield put(getViolateUserIdFail(error))
  }
}

function* fetViolateDataId({payload: id}) {
  try {
    const response = yield call(getViolateDataId, id);
    yield put(getViolateIdSuccess(response));
  } catch (error) {
    yield put(getViolateIdFail(error))
  }
}

function* onAddNewViolate({ payload: data }) {
  try {
      const response = yield call(addNewDataViolate, data);
      yield put(setViolateSuccess(response));
      toast.success("Violate Added Successfully", { autoClose: 2000 });
      yield call(refreshViolateData);
      yield call(refreshViolateListData);
  } catch (error) {
      yield put(setViolateFail(error));
      toast.error("Violate Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateViolate({ payload: data }) {
  try {
      const response = yield call(updateDataViolate, data)
      yield put(updateViolateSuccess(response));
      toast.success("Violate Updated Successfully", { autoClose: 2000 });
      yield call(refreshViolateData);
      yield call(refreshViolateListData);
  } catch (error) {
      yield put(updateViolateFail(error))
      toast.error("Violate Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteViolate({ payload: id }) {
  try {
      const response = yield call(deleteDataViolate, id)
      yield put(deleteViolateSuccess(response));
      toast.success("Violate Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteViolateFail(error))
      toast.error("Violate Delete Failed", { autoClose: 2000 });
  }
}

function* refreshViolateData() {
  const response = yield call(getViolateDataAll);
  yield put(getViolateAllSuccess(response));
}

function* refreshViolateListData() {
  const response = yield call(getViolateListDataAll);
  yield put(getViolateListAllSuccess(response));
}
                                      

function* ViolateSaga() {
  yield takeEvery(GET_VIOLATE_ALL, fetViolateData)
  yield takeEvery(GET_VIOLATE_USERID, fetViolateDataUserId)
  yield takeEvery(GET_VIOLATE_ID, fetViolateDataId)
  yield takeEvery(SET_VIOLATE, onAddNewViolate)
  yield takeEvery(UPDATE_VIOLATE, onUpdateViolate)
  yield takeEvery(DELETE_VIOLATE, onDeleteViolate)
}
                                      
export default ViolateSaga;