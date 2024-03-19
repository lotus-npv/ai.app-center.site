import { takeEvery, put, call, all, fork, takeLatest } from "redux-saga/effects";

// Login Redux States
import {
  DELETE_INTERN,GET_INTERN_ALL, SET_INTERN, UPDATE_INTERN,GET_INTERN_ALLINFO
} from "./actionTypes"
import {
  getInternAllFail,
  getInternAllSuccess,
  getInternAllInfoFail,
  getInternAllInfoSuccess,
  setInternSuccess,
  setInternFail,
  updateInternSuccess,
  updateInternFail,
  deleteInternSuccess,
  deleteInternFail
} from "./actions"

import { getInternDataAll, addNewDataIntern, updateDataIntern, deleteDataIntern, getInternDataAllInfo } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetInternData() {
  try {
    const response = yield call(getInternDataAll);
    yield put(getInternAllSuccess(response));
  } catch (error) {
    yield put(getInternAllFail(error))
  }
}

function* fetInternDataAllInfo() {
  try {
    const response = yield call(getInternDataAllInfo);
    yield put(getInternAllInfoSuccess(response));
  } catch (error) {
    yield put(getInternAllInfoFail(error))
  }
}

function* onAddNewIntern({ payload: data }) {
  try {
    const response = yield call(addNewDataIntern, data);
    yield put(setInternSuccess(response));
    toast.success("Intern Added Successfully", { autoClose: 2000 });
    yield call(refreshInternData);
  } catch (error) {
    yield put(setInternFail(error));
    toast.error("Intern Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateIntern({ payload: data }) {
  try {
    const response = yield call(updateDataIntern, data)
    yield put(updateInternSuccess(response));
    toast.success("Intern Updated Successfully", { autoClose: 2000 });
    yield call(refreshInternData);
  } catch (error) {
    yield put(updateInternFail(error))
    toast.error("Intern Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteIntern({ payload: id }) {
  try {
    const response = yield call(deleteDataIntern, id)
    yield put(deleteInternSuccess(response));
    toast.success("Intern Delete Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteInternFail(error))
    toast.error("Intern Delete Failed", { autoClose: 2000 });
  }
}

function* refreshInternData() {
  const response = yield call(getInternDataAll);
  yield put(getInternAllSuccess(response));
}


function* InternSaga() {
  yield takeLatest(GET_INTERN_ALL, fetInternData)
  yield takeLatest(GET_INTERN_ALLINFO, fetInternDataAllInfo)
  yield takeLatest(SET_INTERN, onAddNewIntern)
  yield takeLatest(UPDATE_INTERN, onUpdateIntern)
  yield takeLatest(DELETE_INTERN, onDeleteIntern)
}

export default InternSaga;