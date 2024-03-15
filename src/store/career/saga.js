import { takeEvery, put, call,all,fork  } from "redux-saga/effects";


// Login Redux States
import {
    GET_CAREER_ALL, SET_CAREER, UPDATE_CAREER,
} from "./actionTypes"
import {
    getCareerAllFail,
    getCareerAllSuccess,
    setCareerSuccess,
    setCareerFail,
    updateCareerSuccess,
    updateCareerFail
} from "./actions"
                                      
import { getCareerDataAll, addNewCareer, updateCareer } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetCareerData() {
  try {
    const response = yield call(getCareerDataAll)
    yield put(getCareerAllSuccess(response))
  } catch (error) {
    yield put(getCareerAllFail(error))
  }
}

function* onAddNewCareer({ payload: data }) {
  try {
      const response = yield call(addNewCareer, data);
      yield put(setCareerSuccess(response));
      fetCareerData();
      toast.success("Career Added Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(setCareerFail(error));
      toast.error("Career Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateCareer({ payload: data }) {
  try {
      const response = yield call(updateCareer, data)
      yield put(updateCareerSuccess(response));
      fetCareerData();
      toast.success("Job List Updated Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(updateCareerFail(error))
      toast.error("Job List Updated Failed", { autoClose: 2000 });
  }
}
                                      
// export function* watchFetCareerData() {
//   yield takeEvery(GET_CAREER_ALL, fetCareerData);
//   yield takeEvery(SET_CAREER, onAddNewCareer)
// }
                                      
// function* careerSaga() {
//   yield all([fork(watchFetCareerData)]);
// }

function* careerSaga() {
  yield takeEvery(GET_CAREER_ALL, fetCareerData)
  yield takeEvery(SET_CAREER, onAddNewCareer)
  yield takeEvery(UPDATE_CAREER, onUpdateCareer)
  // yield takeEvery(DELETE_JOB_LIST, onDeleteJobList)
  // yield takeEvery(GET_APPLY_JOB, OnGetApplyJob)
  // yield takeEvery(DELETE_APPLY_JOB, OnDeleteApplyJob)
}
                                      
export default careerSaga;