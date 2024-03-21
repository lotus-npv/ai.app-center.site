import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_DISTRICT_ALL,GET_DISTRICT_ID, SET_DISTRICT, UPDATE_DISTRICT,DELETE_DISTRICT, GET_DISTRICT_BY_PROVINCE_ID
} from "./actionTypes"
import {
    getDistrictAllFail,
    getDistrictAllSuccess,
    getDistrictIdSuccess,
    getDistrictIdFail,
    getDistrictByProvinceIdSuccess,
    getDistrictByProvinceIdFail,
    setDistrictSuccess,
    setDistrictFail,
    updateDistrictSuccess,
    updateDistrictFail,
    deleteDistrictSuccess,
    deleteDistrictFail
} from "./actions"
                                      
import { getDistrictDataAll,getDistrictDataId, getDistrictByProvinceDataId ,addNewDataDistrict, updateDataDistrict, deleteDataDistrict } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetDistrictData() {
  try {
    const response = yield call(getDistrictDataAll);
    yield put(getDistrictAllSuccess(response));
  } catch (error) {
    yield put(getDistrictAllFail(error))
  }
}

function* fetDistrictDataId({payload: id}) {
  try {
    const response = yield call(getDistrictDataId, id);
    yield put(getDistrictIdSuccess(response));
  } catch (error) {
    yield put(getDistrictIdFail(error))
  }
}

function* fetDistrictByProvinceDataId({payload: id}) {
  try {
    const response = yield call(getDistrictByProvinceDataId, id);
    yield put(getDistrictByProvinceIdSuccess(response));
  } catch (error) {
    yield put(getDistrictByProvinceIdFail(error))
  }
}

function* onAddNewDistrict({ payload: data }) {
  try {
      const response = yield call(addNewDataDistrict, data);
      yield put(setDistrictSuccess(response));
      toast.success("District Added Successfully", { autoClose: 2000 });
      yield call(refreshDistrictData);
  } catch (error) {
      yield put(setDistrictFail(error));
      toast.error("District Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateDistrict({ payload: data }) {
  try {
      const response = yield call(updateDataDistrict, data)
      yield put(updateDistrictSuccess(response));
      toast.success("District Updated Successfully", { autoClose: 2000 });
      yield call(refreshDistrictData);
  } catch (error) {
      yield put(updateDistrictFail(error))
      toast.error("District Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteDistrict({ payload: id }) {
  try {
      const response = yield call(deleteDataDistrict, id)
      yield put(deleteDistrictSuccess(response));
      toast.success("District Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteDistrictFail(error))
      toast.error("District Delete Failed", { autoClose: 2000 });
  }
}

function* refreshDistrictData() {
  const response = yield call(getDistrictDataAll);
  yield put(getDistrictAllSuccess(response));
}
                                      

function* DistrictSaga() {
  yield takeEvery(GET_DISTRICT_ALL, fetDistrictData)
  yield takeEvery(GET_DISTRICT_ID, fetDistrictDataId)
  yield takeEvery(GET_DISTRICT_BY_PROVINCE_ID, fetDistrictByProvinceDataId)
  yield takeEvery(SET_DISTRICT, onAddNewDistrict)
  yield takeEvery(UPDATE_DISTRICT, onUpdateDistrict)
  yield takeEvery(DELETE_DISTRICT, onDeleteDistrict)
}
                                      
export default DistrictSaga;