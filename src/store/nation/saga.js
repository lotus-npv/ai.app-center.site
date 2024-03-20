import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_NATION_ALL,GET_NATION_ID, SET_NATION, UPDATE_NATION,DELETE_NATION
} from "./actionTypes"
import {
    getNationAllFail,
    getNationAllSuccess,
    getNationIdSuccess,
    getNationIdFail,
    setNationSuccess,
    setNationFail,
    updateNationSuccess,
    updateNationFail,
    deleteNationSuccess,
    deleteNationFail
} from "./actions"
                                      
import { getNationDataAll,getNationDataId ,addNewDataNation, updateDataNation, deleteDataNation } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetNationData() {
  try {
    const response = yield call(getNationDataAll);
    yield put(getNationAllSuccess(response));
  } catch (error) {
    yield put(getNationAllFail(error))
  }
}

function* fetNationDataId({payload: id}) {
  try {
    const response = yield call(getNationDataId, id);
    yield put(getNationIdSuccess(response));
  } catch (error) {
    yield put(getNationIdFail(error))
  }
}

function* onAddNewNation({ payload: data }) {
  try {
      const response = yield call(addNewDataNation, data);
      yield put(setNationSuccess(response));
      toast.success("Nation Added Successfully", { autoClose: 2000 });
      yield call(refreshNationData);
  } catch (error) {
      yield put(setNationFail(error));
      toast.error("Nation Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateNation({ payload: data }) {
  try {
      const response = yield call(updateDataNation, data)
      yield put(updateNationSuccess(response));
      toast.success("Nation Updated Successfully", { autoClose: 2000 });
      yield call(refreshNationData);
  } catch (error) {
      yield put(updateNationFail(error))
      toast.error("Nation Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteNation({ payload: id }) {
  try {
      const response = yield call(deleteDataNation, id)
      yield put(deleteNationSuccess(response));
      toast.success("Nation Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteNationFail(error))
      toast.error("Nation Delete Failed", { autoClose: 2000 });
  }
}

function* refreshNationData() {
  const response = yield call(getNationDataAll);
  yield put(getNationAllSuccess(response));
}
                                      

function* NationSaga() {
  yield takeEvery(GET_NATION_ALL, fetNationData)
  yield takeEvery(GET_NATION_ID, fetNationDataId)
  yield takeEvery(SET_NATION, onAddNewNation)
  yield takeEvery(UPDATE_NATION, onUpdateNation)
  yield takeEvery(DELETE_NATION, onDeleteNation)
}
                                      
export default NationSaga;