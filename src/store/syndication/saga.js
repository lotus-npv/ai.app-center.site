import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  DELETE_SYNDICATION,GET_SYNDICATION_ALL, SET_SYNDICATION, UPDATE_SYNDICATION,GET_SYNDICATION_USERID
} from "./actionTypes"
import {
    getSyndicationAllFail,
    getSyndicationAllSuccess,
    getSyndicationUserIdFail,
    getSyndicationUserIdSuccess,
    setSyndicationSuccess,
    setSyndicationFail,
    updateSyndicationSuccess,
    updateSyndicationFail,
    deleteSyndicationSuccess,
    deleteSyndicationFail
} from "./actions"
                                      
import { getSyndicationDataAll, addNewDataSyndication, updateDataSyndication, deleteDataSyndication,getSyndicationDataUserId } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetSyndicationData() {
  try {
    const response = yield call(getSyndicationDataAll);
    yield put(getSyndicationAllSuccess(response));
    // console.log('saga syndication:', response)
  } catch (error) {
    yield put(getSyndicationAllFail(error))
  }
}

function* fetSyndicationDataUserId({ payload: id }) {
  try {
    const response = yield call(getSyndicationDataUserId, id);
    yield put(getSyndicationUserIdSuccess(response));
    // console.log('saga syndication:', response)
  } catch (error) {
    yield put(getSyndicationUserIdFail(error))
  }
}

function* onAddNewSyndication({ payload: data }) {
  try {
      const response = yield call(addNewDataSyndication, data);
      yield put(setSyndicationSuccess(response));
      toast.success("Syndication Added Successfully", { autoClose: 2000 });
      yield call(refreshSyndicationData);
  } catch (error) {
      yield put(setSyndicationFail(error));
      toast.error("Syndication Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateSyndication({ payload: data }) {
  try {
      const response = yield call(updateDataSyndication, data)
      yield put(updateSyndicationSuccess(response));
      toast.success("Syndication Updated Successfully", { autoClose: 2000 });
      yield call(refreshSyndicationData);
  } catch (error) {
      yield put(updateSyndicationFail(error))
      toast.error("Syndication Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteSyndication({ payload: id }) {
  try {
      const response = yield call(deleteDataSyndication, id)
      yield put(deleteSyndicationSuccess(response));
      toast.success("Syndication Delete Successfully", { autoClose: 2000 });
      yield call(refreshSyndicationData);
  } catch (error) {
      yield put(deleteSyndicationFail(error))
      toast.error("Syndication Delete Failed", { autoClose: 2000 });
  }
}

function* refreshSyndicationData() {
  const response = yield call(getSyndicationDataAll);
  yield put(getSyndicationAllSuccess(response));
}
                                      

function* SyndicationSaga() {
  yield takeLatest(GET_SYNDICATION_ALL, fetSyndicationData)
  yield takeLatest(GET_SYNDICATION_USERID, fetSyndicationDataUserId)
  yield takeLatest(SET_SYNDICATION, onAddNewSyndication)
  yield takeLatest(UPDATE_SYNDICATION, onUpdateSyndication)
  yield takeLatest(DELETE_SYNDICATION, onDeleteSyndication)
}
                                      
export default SyndicationSaga;