import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_AVATA_ALL,GET_AVATA_ID, SET_AVATA, UPDATE_AVATA,DELETE_AVATA
} from "./actionTypes"
import {
    getAvataAllFail,
    getAvataAllSuccess,
    getAvataIdSuccess,
    getAvataIdFail,
    setAvataSuccess,
    setAvataFail,
    updateAvataSuccess,
    updateAvataFail,
    deleteAvataSuccess,
    deleteAvataFail
} from "./actions"
                                      
import { getAvataDataAll,getAvataDataId ,addNewDataAvata, updateDataAvata, deleteDataAvata } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetAvataData() {
  try {
    const response = yield call(getAvataDataAll);
    yield put(getAvataAllSuccess(response));
  } catch (error) {
    yield put(getAvataAllFail(error))
  }
}

function* fetAvataDataId({payload: id}) {
  try {
    const response = yield call(getAvataDataId, id);
    yield put(getAvataIdSuccess(response));
  } catch (error) {
    yield put(getAvataIdFail(error))
  }
}

function* onAddNewAvata({ payload: data }) {
  try {
      const response = yield call(addNewDataAvata, data);
      yield put(setAvataSuccess(response));
      toast.success("Avata Added Successfully", { autoClose: 2000 });
      yield call(refreshAvataData);
  } catch (error) {
      yield put(setAvataFail(error));
      toast.error("Avata Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateAvata({ payload: data }) {
  try {
      const response = yield call(updateDataAvata, data)
      yield put(updateAvataSuccess(response));
      toast.success("Avata Updated Successfully", { autoClose: 2000 });
      yield call(refreshAvataData);
  } catch (error) {
      yield put(updateAvataFail(error))
      toast.error("Avata Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteAvata({ payload: id }) {
  try {
      const response = yield call(deleteDataAvata, id)
      yield put(deleteAvataSuccess(response));
      toast.success("Avata Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteAvataFail(error))
      toast.error("Avata Delete Failed", { autoClose: 2000 });
  }
}

function* refreshAvataData() {
  const response = yield call(getAvataDataAll);
  yield put(getAvataAllSuccess(response));
}
                                      

function* AvataSaga() {
  yield takeEvery(GET_AVATA_ALL, fetAvataData)
  yield takeEvery(GET_AVATA_ID, fetAvataDataId)
  yield takeEvery(SET_AVATA, onAddNewAvata)
  yield takeEvery(UPDATE_AVATA, onUpdateAvata)
  yield takeEvery(DELETE_AVATA, onDeleteAvata)
}
                                      
export default AvataSaga;