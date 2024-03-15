import { takeEvery, put, call,all,fork  } from "redux-saga/effects";

// Login Redux States
import {
    GET_CAREER_ALL,
} from "./actionTypes"
import {
    getCareerAllFail,
    getCareerAllSuccess,
} from "./actions"
                                      
import { getCareerDataAll } from "../../helpers/fakebackend_helper";

function* fetCareerData() {
  try {
    const response = yield call(getCareerDataAll)
    yield put(getCareerAllSuccess(response))
  } catch (error) {
    yield put(getCareerAllFail(error))
  }
}
                                      
export function* watchFetCareerData() {
  yield takeEvery(GET_CAREER_ALL, fetCareerData);
}
                                      
function* careerSaga() {
  yield all([fork(watchFetCareerData)]);
}
                                      
export default careerSaga;