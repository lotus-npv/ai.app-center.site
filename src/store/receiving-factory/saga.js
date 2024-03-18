import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  DELETE_RECEIVINGFACTORY,GET_RECEIVINGFACTORY_ALL, SET_RECEIVINGFACTORY, UPDATE_RECEIVINGFACTORY,
} from "./actionTypes"
import {
    getReceivingFactoryAllFail,
    getReceivingFactoryAllSuccess,
    setReceivingFactorySuccess,
    setReceivingFactoryFail,
    updateReceivingFactorySuccess,
    updateReceivingFactoryFail,
    deleteReceivingFactorySuccess,
    deleteReceivingFactoryFail
} from "./actions"
                                      
import { getReceivingFactoryDataAll, addNewDataReceivingFactory, updateDataReceivingFactory, deleteDataReceivingFactory } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetReceivingFactoryData() {
  try {
    const response = yield call(getReceivingFactoryDataAll);
    yield put(getReceivingFactoryAllSuccess(response));
  } catch (error) {
    yield put(getReceivingFactoryAllFail(error))
  }
}

function* onAddNewReceivingFactory({ payload: data }) {
  try {
      const response = yield call(addNewDataReceivingFactory, data);
      yield put(setReceivingFactorySuccess(response));
      toast.success("ReceivingFactory Added Successfully", { autoClose: 2000 });
      yield call(refreshReceivingFactoryData);
  } catch (error) {
      yield put(setReceivingFactoryFail(error));
      toast.error("ReceivingFactory Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateReceivingFactory({ payload: data }) {
  try {
      const response = yield call(updateDataReceivingFactory, data)
      yield put(updateReceivingFactorySuccess(response));
      toast.success("ReceivingFactory Updated Successfully", { autoClose: 2000 });
      yield call(refreshReceivingFactoryData);
  } catch (error) {
      yield put(updateReceivingFactoryFail(error))
      toast.error("ReceivingFactory Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteReceivingFactory({ payload: id }) {
  try {
      const response = yield call(deleteDataReceivingFactory, id)
      yield put(deleteReceivingFactorySuccess(response));
      toast.success("ReceivingFactory Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteReceivingFactoryFail(error))
      toast.error("ReceivingFactory Delete Failed", { autoClose: 2000 });
  }
}

function* refreshReceivingFactoryData() {
  const response = yield call(getReceivingFactoryDataAll);
  yield put(getReceivingFactoryAllSuccess(response));
}
                                      

function* ReceivingFactorySaga() {
  yield takeLatest(GET_RECEIVINGFACTORY_ALL, fetReceivingFactoryData)
  yield takeLatest(SET_RECEIVINGFACTORY, onAddNewReceivingFactory)
  yield takeLatest(UPDATE_RECEIVINGFACTORY, onUpdateReceivingFactory)
  yield takeLatest(DELETE_RECEIVINGFACTORY, onDeleteReceivingFactory)
}
                                      
export default ReceivingFactorySaga;