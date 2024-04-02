import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_NOTI_ALL, SET_NOTI, GET_NOTI_USERID
} from "./actionTypes"
import {
    getNotiAllFail,
    getNotiAllSuccess,
    getNotiUserIdFail,
    getNotiUserIdSuccess,
    setNotiSuccess,
    setNotiFail,
} from "./actions"
                                      
import { getNotiDataAll,getNotiDataByUserId ,addNewNoti} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetNotiData({ payload: id }) {
  try {
    const response = yield call(getNotiDataAll, id);
    yield put(getNotiAllSuccess(response));
  } catch (error) {
    yield put(getNotiAllFail(error))
  }
}

function* fetNotiDataUserId({ payload: id }) {
  try {
    const response = yield call(getNotiDataByUserId, id);
    yield put(getNotiUserIdSuccess(response));
  } catch (error) {
    yield put(getNotiUserIdFail(error))
  }
}

function* onAddNewNoti({ payload: data }) {
  try {
      const response = yield call(addNewNoti, data);
      yield put(setNotiSuccess(response));
      toast.success("Noti Added Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(setNotiFail(error));
      toast.error("Noti Added Failed", { autoClose: 2000 });
  }
}
                               
function* NotiSaga() {
  yield takeLatest(GET_NOTI_ALL, fetNotiData)
  yield takeLatest(GET_NOTI_USERID, fetNotiDataUserId)
  yield takeLatest(SET_NOTI, onAddNewNoti)
}
                                      
export default NotiSaga;