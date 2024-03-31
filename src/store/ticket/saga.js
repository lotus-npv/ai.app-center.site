import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_TICKET_ALL,GET_TICKET_ID, SET_TICKET, UPDATE_TICKET,DELETE_TICKET,GET_TICKET_ALLINFO,GET_TICKET_USERID
} from "./actionTypes"
import {
    getTicketAllFail,
    getTicketAllSuccess,

    getTicketAllInfoFail,
    getTicketAllInfoSuccess,

    getTicketUserIdFail,
    getTicketUserIdSuccess,

    getTicketIdSuccess,
    getTicketIdFail,

    setTicketSuccess,
    setTicketFail,

    updateTicketSuccess,
    updateTicketFail,

    deleteTicketSuccess,
    deleteTicketFail
} from "./actions"
                                      
import { getTicketDataAll,getTicketDataId ,addNewDataTicket, updateDataTicket, deleteDataTicket, getTicketDataAllInfo , getTicketDataUserId } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetTicketData() {
  try {
    const response = yield call(getTicketDataAll);
    yield put(getTicketAllSuccess(response));
    // console.log(response)
  } catch (error) {
    yield put(getTicketAllFail(error))
  }
}

function* fetTicketDataAllInfo() {
  try {
    const response = yield call(getTicketDataAllInfo);
    yield put(getTicketAllInfoSuccess(response));
  } catch (error) {
    yield put(getTicketAllInfoFail(error))
  }
}

function* fetTicketDataUserId({payload: id}) {
  try {
    const response = yield call(getTicketDataUserId, id);
    yield put(getTicketUserIdSuccess(response));
  } catch (error) {
    yield put(getTicketUserIdFail(error))
  }
}

function* fetTicketDataId({payload: id}) {
  try {
    const response = yield call(getTicketDataId, id);
    yield put(getTicketIdSuccess(response));
  } catch (error) {
    yield put(getTicketIdFail(error))
  }
}

function* onAddNewTicket({ payload: data }) {
  try {
      const response = yield call(addNewDataTicket, data);
      yield put(setTicketSuccess(response));
      toast.success("Ticket Added Successfully", { autoClose: 2000 });
      // yield call(refreshTicketData);
  } catch (error) {
      yield put(setTicketFail(error));
      toast.error("Ticket Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateTicket({ payload: data }) {
  try {
      const response = yield call(updateDataTicket, data)
      yield put(updateTicketSuccess(response));
      // toast.success("Ticket Updated Successfully", { autoClose: 2000 });
      // yield call(refreshTicketData);
  } catch (error) {
      yield put(updateTicketFail(error))
      toast.error("Ticket Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteTicket({ payload: id }) {
  try {
      const response = yield call(deleteDataTicket, id)
      yield put(deleteTicketSuccess(response));
      toast.success("Ticket Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteTicketFail(error))
      toast.error("Ticket Delete Failed", { autoClose: 2000 });
  }
}

function* refreshTicketData() {
  const response = yield call(getTicketDataAll);
  yield put(getTicketAllSuccess(response));
}
                                      

function* TicketSaga() {
  yield takeEvery(GET_TICKET_ALL, fetTicketData)
  yield takeLatest(GET_TICKET_ALLINFO, fetTicketDataAllInfo)
  yield takeLatest(GET_TICKET_USERID, fetTicketDataUserId)
  yield takeEvery(GET_TICKET_ID, fetTicketDataId)
  yield takeEvery(SET_TICKET, onAddNewTicket)
  yield takeEvery(UPDATE_TICKET, onUpdateTicket)
  yield takeEvery(DELETE_TICKET, onDeleteTicket)
}
                                      
export default TicketSaga;