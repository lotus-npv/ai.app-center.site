import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_ALIENREGISTRATIONCARD_ALL,GET_ALIENREGISTRATIONCARD_ID, SET_ALIENREGISTRATIONCARD, UPDATE_ALIENREGISTRATIONCARD,DELETE_ALIENREGISTRATIONCARD
} from "./actionTypes"
import {
    getAlienRegistrationCardAllFail,
    getAlienRegistrationCardAllSuccess,
    getAlienRegistrationCardAllInfoFail,
    getAlienRegistrationCardAllInfoSuccess,
    getAlienRegistrationCardIdSuccess,
    getAlienRegistrationCardIdFail,
    setAlienRegistrationCardSuccess,
    setAlienRegistrationCardFail,
    updateAlienRegistrationCardSuccess,
    updateAlienRegistrationCardFail,
    deleteAlienRegistrationCardSuccess,
    deleteAlienRegistrationCardFail
} from "./actions"
                                      
import { getAlienRegistrationCardDataAll, getAlienRegistrationCardDataAllInfo,getAlienRegistrationCardDataId ,addNewDataAlienRegistrationCard, updateDataAlienRegistrationCard, deleteDataAlienRegistrationCard } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetAlienRegistrationCardData() {
  try {
    const response = yield call(getAlienRegistrationCardDataAll);
    yield put(getAlienRegistrationCardAllSuccess(response));
  } catch (error) {
    yield put(getAlienRegistrationCardAllFail(error))
  }
}

function* fetAlienRegistrationCardDataAllInfo() {
  try {
    const response = yield call(getAlienRegistrationCardDataAllInfo);
    yield put(getAlienRegistrationCardAllInfoSuccess(response));
  } catch (error) {
    yield put(getAlienRegistrationCardAllInfoFail(error))
  }
}

function* fetAlienRegistrationCardDataId({payload: id}) {
  try {
    const response = yield call(getAlienRegistrationCardDataId, id);
    yield put(getAlienRegistrationCardIdSuccess(response));
  } catch (error) {
    yield put(getAlienRegistrationCardIdFail(error))
  }
}

function* onAddNewAlienRegistrationCard({ payload: data }) {
  try {
      const response = yield call(addNewDataAlienRegistrationCard, data);
      yield put(setAlienRegistrationCardSuccess(response));
      toast.success("AlienRegistrationCard Added Successfully", { autoClose: 2000 });
      yield call(refreshAlienRegistrationCardData);
  } catch (error) {
      yield put(setAlienRegistrationCardFail(error));
      toast.error("AlienRegistrationCard Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateAlienRegistrationCard({ payload: data }) {
  try {
      const response = yield call(updateDataAlienRegistrationCard, data)
      yield put(updateAlienRegistrationCardSuccess(response));
      toast.success("AlienRegistrationCard Updated Successfully", { autoClose: 2000 });
      yield call(refreshAlienRegistrationCardData);
  } catch (error) {
      yield put(updateAlienRegistrationCardFail(error))
      toast.error("AlienRegistrationCard Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteAlienRegistrationCard({ payload: id }) {
  try {
      const response = yield call(deleteDataAlienRegistrationCard, id)
      yield put(deleteAlienRegistrationCardSuccess(response));
      toast.success("AlienRegistrationCard Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteAlienRegistrationCardFail(error))
      toast.error("AlienRegistrationCard Delete Failed", { autoClose: 2000 });
  }
}

function* refreshAlienRegistrationCardData() {
  const response = yield call(getAlienRegistrationCardDataAll);
  yield put(getAlienRegistrationCardAllSuccess(response));
}
                                      

function* AlienRegistrationCardSaga() {
  yield takeEvery(GET_ALIENREGISTRATIONCARD_ALL, fetAlienRegistrationCardData)
  yield takeEvery(GET_ALIENREGISTRATIONCARD_ALLINFO, fetAlienRegistrationCardDataAllInfo)
  yield takeEvery(GET_ALIENREGISTRATIONCARD_ID, fetAlienRegistrationCardDataId)
  yield takeEvery(SET_ALIENREGISTRATIONCARD, onAddNewAlienRegistrationCard)
  yield takeEvery(UPDATE_ALIENREGISTRATIONCARD, onUpdateAlienRegistrationCard)
  yield takeEvery(DELETE_ALIENREGISTRATIONCARD, onDeleteAlienRegistrationCard)
}
                                      
export default AlienRegistrationCardSaga;