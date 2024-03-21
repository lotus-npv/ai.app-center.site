import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_COMMUNE_ALL,GET_COMMUNE_ID, SET_COMMUNE, UPDATE_COMMUNE,DELETE_COMMUNE, GET_COMMUNE_BY_DISTRICT_ID
} from "./actionTypes"
import {
    getCommuneAllFail,
    getCommuneAllSuccess,
    getCommuneIdSuccess,
    getCommuneIdFail,
    getCommuneByDistrictIdSuccess,
    getCommuneByDistrictIdFail,
    setCommuneSuccess,
    setCommuneFail,
    updateCommuneSuccess,
    updateCommuneFail,
    deleteCommuneSuccess,
    deleteCommuneFail
} from "./actions"
                                      
import { getCommuneDataAll,getCommuneDataId, getCommuneByDistrictDataId ,addNewDataCommune, updateDataCommune, deleteDataCommune } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetCommuneData() {
  try {
    const response = yield call(getCommuneDataAll);
    yield put(getCommuneAllSuccess(response));
  } catch (error) {
    yield put(getCommuneAllFail(error))
  }
}

function* fetCommuneDataId({payload: id}) {
  try {
    const response = yield call(getCommuneDataId, id);
    yield put(getCommuneIdSuccess(response));
  } catch (error) {
    yield put(getCommuneIdFail(error))
  }
}

function* fetCommuneByDistrictDataId({payload: id}) {
  try {
    const response = yield call(getCommuneByDistrictDataId, id);
    yield put(getCommuneByDistrictIdSuccess(response));
  } catch (error) {
    yield put(getCommuneByDistrictIdFail(error))
  }
}

function* onAddNewCommune({ payload: data }) {
  try {
      const response = yield call(addNewDataCommune, data);
      yield put(setCommuneSuccess(response));
      toast.success("Commune Added Successfully", { autoClose: 2000 });
      yield call(refreshCommuneData);
  } catch (error) {
      yield put(setCommuneFail(error));
      toast.error("Commune Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateCommune({ payload: data }) {
  try {
      const response = yield call(updateDataCommune, data)
      yield put(updateCommuneSuccess(response));
      toast.success("Commune Updated Successfully", { autoClose: 2000 });
      yield call(refreshCommuneData);
  } catch (error) {
      yield put(updateCommuneFail(error))
      toast.error("Commune Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteCommune({ payload: id }) {
  try {
      const response = yield call(deleteDataCommune, id)
      yield put(deleteCommuneSuccess(response));
      toast.success("Commune Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteCommuneFail(error))
      toast.error("Commune Delete Failed", { autoClose: 2000 });
  }
}

function* refreshCommuneData() {
  const response = yield call(getCommuneDataAll);
  yield put(getCommuneAllSuccess(response));
}
                                      

function* CommuneSaga() {
  yield takeEvery(GET_COMMUNE_ALL, fetCommuneData)
  yield takeEvery(GET_COMMUNE_ID, fetCommuneDataId)
  yield takeEvery(GET_COMMUNE_BY_DISTRICT_ID, fetCommuneByDistrictDataId)
  yield takeEvery(SET_COMMUNE, onAddNewCommune)
  yield takeEvery(UPDATE_COMMUNE, onUpdateCommune)
  yield takeEvery(DELETE_COMMUNE, onDeleteCommune)
}
                                      
export default CommuneSaga;