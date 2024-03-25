import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  DELETE_ADDRESS,
    GET_ADDRESS_ALL, SET_ADDRESS, UPDATE_ADDRESS,
} from "./actionTypes"
import {
    getAddressAllFail,
    getAddressAllSuccess,
    setAddressSuccess,
    setAddressFail,
    updateAddressSuccess,
    updateAddressFail,
    deleteAddressSuccess,
    deleteAddressFail
} from "./actions"

import {
  getInternAllInfoSuccess
} from '../intern/actions'
                                      
import { getAddressDataAll, addNewDataAddress, updateDataAddress, deleteDataAddress, getInternDataAllInfo } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetAddressData() {
  try {
    const response = yield call(getAddressDataAll);
    yield put(getAddressAllSuccess(response));
  } catch (error) {
    yield put(getAddressAllFail(error))
  }
}

function* onAddNewAddress({ payload: data }) {
  try {
      const response = yield call(addNewDataAddress, data);
      yield put(setAddressSuccess(response));
      toast.success("Address Added Successfully", { autoClose: 2000 });
      yield call(refreshAddressData);
      yield call(refreshInternData);
  } catch (error) {
      yield put(setAddressFail(error));
      toast.error("Address Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateAddress({ payload: data }) {
  try {
      const response = yield call(updateDataAddress, data)
      yield put(updateAddressSuccess(response));
      toast.success("Address Updated Successfully", { autoClose: 2000 });
      yield call(refreshAddressData);
  } catch (error) {
      yield put(updateAddressFail(error))
      toast.error("Address Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteAddress({ payload: id }) {
  try {
      const response = yield call(deleteDataAddress, id)
      yield put(deleteAddressSuccess(response));
      toast.success("Address Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteAddressFail(error))
      toast.error("Address Delete Failed", { autoClose: 2000 });
  }
}

function* refreshAddressData() {
  const response = yield call(getAddressDataAll);
  yield put(getAddressAllSuccess(response));
}

function* refreshInternData() {
  const response = yield call(getInternDataAllInfo);
  yield put(getInternAllInfoSuccess(response));
}
                                      

function* AddressSaga() {
  yield takeLatest(GET_ADDRESS_ALL, fetAddressData)
  yield takeLatest(SET_ADDRESS, onAddNewAddress)
  yield takeLatest(UPDATE_ADDRESS, onUpdateAddress)
  yield takeLatest(DELETE_ADDRESS, onDeleteAddress)
}
                                      
export default AddressSaga;