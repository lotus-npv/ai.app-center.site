import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_PROVINCE_ALL,GET_PROVINCE_ID, SET_PROVINCE, UPDATE_PROVINCE,DELETE_PROVINCE
} from "./actionTypes"
import {
    getProvinceAllFail,
    getProvinceAllSuccess,
    getProvinceIdSuccess,
    getProvinceIdFail,
    setProvinceSuccess,
    setProvinceFail,
    updateProvinceSuccess,
    updateProvinceFail,
    deleteProvinceSuccess,
    deleteProvinceFail
} from "./actions"
                                      
import { getProvinceDataAll,getProvinceDataId ,addNewDataProvince, updateDataProvince, deleteDataProvince } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetProvinceData() {
  try {
    const response = yield call(getProvinceDataAll);
    yield put(getProvinceAllSuccess(response));
  } catch (error) {
    yield put(getProvinceAllFail(error))
  }
}

function* fetProvinceDataId({payload: id}) {
  try {
    const response = yield call(getProvinceDataId, id);
    yield put(getProvinceIdSuccess(response));
  } catch (error) {
    yield put(getProvinceIdFail(error))
  }
}

function* onAddNewProvince({ payload: data }) {
  try {
      const response = yield call(addNewDataProvince, data);
      yield put(setProvinceSuccess(response));
      toast.success("Province Added Successfully", { autoClose: 2000 });
      yield call(refreshProvinceData);
  } catch (error) {
      yield put(setProvinceFail(error));
      toast.error("Province Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateProvince({ payload: data }) {
  try {
      const response = yield call(updateDataProvince, data)
      yield put(updateProvinceSuccess(response));
      toast.success("Province Updated Successfully", { autoClose: 2000 });
      yield call(refreshProvinceData);
  } catch (error) {
      yield put(updateProvinceFail(error))
      toast.error("Province Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteProvince({ payload: id }) {
  try {
      const response = yield call(deleteDataProvince, id)
      yield put(deleteProvinceSuccess(response));
      toast.success("Province Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteProvinceFail(error))
      toast.error("Province Delete Failed", { autoClose: 2000 });
  }
}

function* refreshProvinceData() {
  const response = yield call(getProvinceDataAll);
  yield put(getProvinceAllSuccess(response));
}
                                      

function* ProvinceSaga() {
  yield takeEvery(GET_PROVINCE_ALL, fetProvinceData)
  yield takeEvery(GET_PROVINCE_ID, fetProvinceDataId)
  yield takeEvery(SET_PROVINCE, onAddNewProvince)
  yield takeEvery(UPDATE_PROVINCE, onUpdateProvince)
  yield takeEvery(DELETE_PROVINCE, onDeleteProvince)
}
                                      
export default ProvinceSaga;