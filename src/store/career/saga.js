import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_CAREER_ALL,GET_CAREER_ID, SET_CAREER, UPDATE_CAREER,DELETE_CAREER
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
      console.log(response);
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
      yield call(refreshCareerData);
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
  yield takeEvery(GET_CAREER_ALL, fetCareerData)
  yield takeEvery(GET_CAREER_ID, fetCareerDataId)
  yield takeEvery(SET_CAREER, onAddNewCareer)
  yield takeEvery(UPDATE_CAREER, onUpdateCareer)
  yield takeEvery(DELETE_CAREER, onDeleteCareer)
}
                                      
export default CareerSaga;