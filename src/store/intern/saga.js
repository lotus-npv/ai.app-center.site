import { takeEvery, put, call, all, fork, takeLatest } from "redux-saga/effects";

// Login Redux States
import {
  DELETE_INTERN,GET_INTERN_ALL, SET_INTERN, UPDATE_INTERN,GET_INTERN_ALLINFO, OPEN_MODAL, GET_INTERN_USERID, GET_INTERN_KEYID
} from "./actionTypes"
import {
  getInternAllFail,
  getInternAllSuccess,
  getInternAllInfoFail,
  getInternAllInfoSuccess,
  getInternUserIdSuccess,
  getInternUserIdFail,

  getInternKeyIdSuccess,
  getInternKeyIdFail,

  setInternSuccess,
  setInternFail,
  updateInternSuccess,
  updateInternFail,
  deleteInternSuccess,
  deleteInternFail,
  openModal
} from "./actions"

import { getInternDataAll, addNewDataIntern, updateDataIntern, deleteDataIntern, getInternDataAllInfo, getInternDataUserId , getInternDataKeyId} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* changeTogModal(action) {
  yield put({ type: 'OPEN_MODAL', payload: action.payload });
}

function* fetInternData() {
  try {
    const response = yield call(getInternDataAll);
    yield put(getInternAllSuccess(response));
  } catch (error) {
    yield put(getInternAllFail(error))
  }
}

function* fetInternDataAllInfo() {
  // console.log('saga intern', id)
  try {
    const response = yield call(getInternDataAllInfo);
    yield put(getInternAllInfoSuccess(response));
    // console.log('saga intern', response)
  } catch (error) {
    yield put(getInternAllInfoFail(error))
  }
}

function* fetInternDataUserId({ payload: id }) {
  // console.log('saga intern', id)
  try {
    const response = yield call(getInternDataUserId, id);
    yield put(getInternUserIdSuccess(response));
    // console.log('saga intern', response)
  } catch (error) {
    yield put(getInternUserIdFail(error))
  }
}

function* fetInternDataKeyId({ payload: id }) {
  // console.log('saga intern', id)
  try {
    const response = yield call(getInternDataKeyId, id);
    yield put(getInternKeyIdSuccess(response));
    // console.log('saga intern', response)
  } catch (error) {
    yield put(getInternKeyIdFail(error))
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
  const response = yield call(getInternDataAllInfo);
  yield put(getInternAllInfoSuccess(response));
}


function* InternSaga() {
  yield takeLatest(GET_INTERN_ALL, fetInternData)
  yield takeLatest(GET_INTERN_ALLINFO, fetInternDataAllInfo)
  yield takeLatest(GET_INTERN_USERID, fetInternDataUserId)
  yield takeLatest(GET_INTERN_KEYID, fetInternDataKeyId)
  yield takeLatest(SET_INTERN, onAddNewIntern)
  yield takeLatest(UPDATE_INTERN, onUpdateIntern)
  yield takeLatest(DELETE_INTERN, onDeleteIntern)
  yield takeEvery(OPEN_MODAL, changeTogModal)
}

export default InternSaga;