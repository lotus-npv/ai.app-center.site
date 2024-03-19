import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_ALIENREGISTRATIONCARD_ALL,GET_ALIENREGISTRATIONCARD_ID, SET_ALIENREGISTRATIONCARD, UPDATE_ALIENREGISTRATIONCARD,DELETE_ALIENREGISTRATIONCARD
} from "./actionTypes"
import {
    getCareerAllFail,
    getCareerAllSuccess,
    getCareerIdSuccess,
    getCareerIdFail,
    setCareerSuccess,
    setCareerFail,
    updateCareerSuccess,
    updateCareerFail,
    deleteCareerSuccess,
    deleteCareerFail
} from "./actions"
                                      
import { getCareerDataAll,getCareerDataId ,addNewDataCareer, updateDataCareer, deleteDataCareer } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetCareerData() {
  try {
    const response = yield call(getCareerDataAll);
    yield put(getCareerAllSuccess(response));
  } catch (error) {
    yield put(getCareerAllFail(error))
  }
}

function* fetCareerDataId({payload: id}) {
  try {
    const response = yield call(getCareerDataId, id);
    yield put(getCareerIdSuccess(response));
  } catch (error) {
    yield put(getCareerIdFail(error))
  }
}

function* onAddNewCareer({ payload: data }) {
  try {
      const response = yield call(addNewDataCareer, data);
      yield put(setCareerSuccess(response));
      toast.success("Career Added Successfully", { autoClose: 2000 });
      yield call(refreshCareerData);
  } catch (error) {
      yield put(setCareerFail(error));
      toast.error("Career Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateCareer({ payload: data }) {
  try {
      const response = yield call(updateDataCareer, data)
      yield put(updateCareerSuccess(response));
      toast.success("Career Updated Successfully", { autoClose: 2000 });
      yield call(refreshCareerData);
  } catch (error) {
      yield put(updateCareerFail(error))
      toast.error("Career Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteCareer({ payload: id }) {
  try {
      const response = yield call(deleteDataCareer, id)
      yield put(deleteCareerSuccess(response));
      toast.success("Career Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteCareerFail(error))
      toast.error("Career Delete Failed", { autoClose: 2000 });
  }
}

function* refreshCareerData() {
  const response = yield call(getCareerDataAll);
  yield put(getCareerAllSuccess(response));
}
                                      

function* CareerSaga() {
  yield takeEvery(GET_ALIENREGISTRATIONCARD_ALL, fetCareerData)
  yield takeEvery(GET_ALIENREGISTRATIONCARD_ID, fetCareerDataId)
  yield takeEvery(SET_ALIENREGISTRATIONCARD, onAddNewCareer)
  yield takeEvery(UPDATE_ALIENREGISTRATIONCARD, onUpdateCareer)
  yield takeEvery(DELETE_ALIENREGISTRATIONCARD, onDeleteCareer)
}
                                      
export default CareerSaga;