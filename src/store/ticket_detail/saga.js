import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_TICKETDETAIL_ALL,GET_TICKETDETAIL_ID, SET_TICKETDETAIL, UPDATE_TICKETDETAIL,DELETE_TICKETDETAIL,GET_TICKETDETAIL_BY_TICKET_ID
} from "./actionTypes"
import {
    getTicketDetailAllFail,
    getTicketDetailAllSuccess,

    getTicketDetailByTicketIdFail,
    getTicketDetailByTicketIdSuccess,

    getTicketDetailIdSuccess,
    getTicketDetailIdFail,

    setTicketDetailSuccess,
    setTicketDetailFail,
    updateTicketDetailSuccess,
    updateTicketDetailFail,
    deleteTicketDetailSuccess,
    deleteTicketDetailFail
} from "./actions"
                                      
import { getTicketDetailDataAll,getTicketDetailDataId ,addNewDataTicketDetail, updateDataTicketDetail, deleteDataTicketDetail, getTicketDetailDataByTicketId } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetTicketDetailData() {
  try {
    const response = yield call(getTicketDetailDataAll);
    yield put(getTicketDetailAllSuccess(response));
  } catch (error) {
    yield put(getTicketDetailAllFail(error))
  }
}

function* fetTicketDetailDataByTicketId({payload: id}) {
  try {
    const response = yield call(getTicketDetailDataByTicketId, id);
    yield put(getTicketDetailByTicketIdSuccess(response));
  } catch (error) {
    yield put(getTicketDetailByTicketIdFail(error))
  }
}

function* fetTicketDetailDataId({payload: id}) {
  try {
    const response = yield call(getTicketDetailDataId, id);
    yield put(getTicketDetailIdSuccess(response));
  } catch (error) {
    yield put(getTicketDetailIdFail(error))
  }
}

function* onAddNewTicketDetail({ payload: data }) {
  try {
      const response = yield call(addNewDataTicketDetail, data);
      yield put(setTicketDetailSuccess(response));
      // toast.success("TicketDetail Added Successfully", { autoClose: 2000 });
      // yield call(refreshTicketDetailData);
  } catch (error) {
      yield put(setTicketDetailFail(error));
      toast.error("Phản hồi ticket không thành công", { autoClose: 2000 });
  }
}

function* onUpdateTicketDetail({ payload: data }) {
  try {
      const response = yield call(updateDataTicketDetail, data)
      yield put(updateTicketDetailSuccess(response));
      // toast.success("TicketDetail Updated Successfully", { autoClose: 2000 });
      // yield call(refreshTicketDetailData);
  } catch (error) {
      yield put(updateTicketDetailFail(error))
      // toast.error("Phản hồi ticket không thành công", { autoClose: 2000 });
  }
}

function* onDeleteTicketDetail({ payload: id }) {
  try {
      const response = yield call(deleteDataTicketDetail, id)
      yield put(deleteTicketDetailSuccess(response));
      // toast.success("TicketDetail Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteTicketDetailFail(error))
      // toast.error("TicketDetail Delete Failed", { autoClose: 2000 });
  }
}

function* refreshTicketDetailData() {
  const response = yield call(getTicketDetailDataAll);
  yield put(getTicketDetailAllSuccess(response));
}
                                      

function* TicketDetailSaga() {
  yield takeEvery(GET_TICKETDETAIL_ALL, fetTicketDetailData)
  yield takeEvery(GET_TICKETDETAIL_BY_TICKET_ID, fetTicketDetailDataByTicketId)
  yield takeEvery(GET_TICKETDETAIL_ID, fetTicketDetailDataId)
  yield takeEvery(SET_TICKETDETAIL, onAddNewTicketDetail)
  yield takeEvery(UPDATE_TICKETDETAIL, onUpdateTicketDetail)
  yield takeEvery(DELETE_TICKETDETAIL, onDeleteTicketDetail)
}
                                      
export default TicketDetailSaga;