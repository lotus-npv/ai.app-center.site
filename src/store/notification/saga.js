import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_NOTI_ALL, SET_NOTI, GET_NOTI_USERID, UPDATE_NOTI
} from "./actionTypes"
import {
    getNotiAllFail,
    getNotiAllSuccess,
    getNotiUserIdFail,
    getNotiUserIdSuccess,
    setNotiSuccess,
    setNotiFail,
    updateNotiSuccess,
    updateNotiFail,
} from "./actions"
                                      
import { getNotiDataAll,getNotiDataByUserId ,addNewDataNoti, updateDataNoti} from "../../helpers/fakebackend_helper";
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
      const response = yield call(addNewDataNoti, data);
      yield put(setNotiSuccess(response));
      // toast.success("Noti Added Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(setNotiFail(error));
      // toast.error("Noti Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateNoti({ payload: data }) {
  try {
    const response = yield call(updateDataNoti, data)
    yield put(updateNotiSuccess(response));
    // toast.success("Status Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateNotiFail(error))
    // toast.error("Status Updated Failed", { autoClose: 2000 });
  }
}
                               
function* NotiSaga() {
  yield takeLatest(GET_NOTI_ALL, fetNotiData)
  yield takeLatest(GET_NOTI_USERID, fetNotiDataUserId)
  yield takeLatest(SET_NOTI, onAddNewNoti)
  yield takeLatest(UPDATE_NOTI, onUpdateNoti)
}
                                      
export default NotiSaga;