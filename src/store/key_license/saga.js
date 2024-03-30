import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_KEYLICENSE_ALL,GET_KEYLICENSE_ID, SET_KEYLICENSE, UPDATE_KEYLICENSE,DELETE_KEYLICENSE
} from "./actionTypes"
import {
    getKeyLicenseAllFail,
    getKeyLicenseAllSuccess,
    getKeyLicenseIdSuccess,
    getKeyLicenseIdFail,
    setKeyLicenseSuccess,
    setKeyLicenseFail,
    updateKeyLicenseSuccess,
    updateKeyLicenseFail,
    deleteKeyLicenseSuccess,
    deleteKeyLicenseFail
} from "./actions"
                                      
import { getKeyLicenseDataAll,getKeyLicenseDataId ,addNewDataKeyLicense, updateDataKeyLicense, deleteDataKeyLicense } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetKeyLicenseData() {
  try {
    const response = yield call(getKeyLicenseDataAll);
    yield put(getKeyLicenseAllSuccess(response));
  } catch (error) {
    yield put(getKeyLicenseAllFail(error))
  }
}

function* fetKeyLicenseDataId({payload: key}) {
  try {
    const response = yield call(getKeyLicenseDataId, key);
    yield put(getKeyLicenseIdSuccess(response));
  } catch (error) {
    yield put(getKeyLicenseIdFail(error))
  }
}

function* onAddNewKeyLicense({ payload: data }) {
  try {
      const response = yield call(addNewDataKeyLicense, data);
      yield put(setKeyLicenseSuccess(response));
      toast.success("KeyLicense Added Successfully", { autoClose: 2000 });
      yield call(refreshKeyLicenseData);
  } catch (error) {
      yield put(setKeyLicenseFail(error));
      toast.error("KeyLicense Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateKeyLicense({ payload: data }) {
  try {
      const response = yield call(updateDataKeyLicense, data)
      yield put(updateKeyLicenseSuccess(response));
      console.log(response);
      toast.success("KeyLicense Updated Successfully", { autoClose: 2000 });
      yield call(refreshKeyLicenseData);
  } catch (error) {
      yield put(updateKeyLicenseFail(error))
      toast.error("KeyLicense Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteKeyLicense({ payload: id }) {
  try {
      const response = yield call(deleteDataKeyLicense, id)
      yield put(deleteKeyLicenseSuccess(response));
      toast.success("KeyLicense Delete Successfully", { autoClose: 2000 });
      yield call(refreshKeyLicenseData);
  } catch (error) {
      yield put(deleteKeyLicenseFail(error))
      toast.error("KeyLicense Delete Failed", { autoClose: 2000 });
  }
}

function* refreshKeyLicenseData() {
  const response = yield call(getKeyLicenseDataAll);
  yield put(getKeyLicenseAllSuccess(response));
}
                                      

function* KeyLicenseSaga() {
  yield takeEvery(GET_KEYLICENSE_ALL, fetKeyLicenseData)
  yield takeEvery(GET_KEYLICENSE_ID, fetKeyLicenseDataId)
  yield takeEvery(SET_KEYLICENSE, onAddNewKeyLicense)
  yield takeEvery(UPDATE_KEYLICENSE, onUpdateKeyLicense)
  yield takeEvery(DELETE_KEYLICENSE, onDeleteKeyLicense)
}
                                      
export default KeyLicenseSaga;