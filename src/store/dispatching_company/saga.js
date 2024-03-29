import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  DELETE_DISPATCHINGCOMPANY,GET_DISPATCHINGCOMPANY_USERID, SET_DISPATCHINGCOMPANY, UPDATE_DISPATCHINGCOMPANY,GET_DISPATCHINGCOMPANY_ALL
} from "./actionTypes"
import {
    getDispatchingCompanyAllFail,
    getDispatchingCompanyAllSuccess,
    getDispatchingCompanyUserIdFail,
    getDispatchingCompanyUserIdSuccess,
    setDispatchingCompanySuccess,
    setDispatchingCompanyFail,
    updateDispatchingCompanySuccess,
    updateDispatchingCompanyFail,
    deleteDispatchingCompanySuccess,
    deleteDispatchingCompanyFail
} from "./actions"
                                      
import { getDispatchingCompanyDataAll, addNewDataDispatchingCompany, updateDataDispatchingCompany, deleteDataDispatchingCompany, getDispatchingCompanyDataUserId } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetDispatchingCompanyData() {
  try {
    const response = yield call(getDispatchingCompanyDataAll);
    yield put(getDispatchingCompanyAllSuccess(response));
  } catch (error) {
    yield put(getDispatchingCompanyAllFail(error))
  }
}

function* fetDispatchingCompanyDataUserId({ payload: id }) {
  try {
    const response = yield call(getDispatchingCompanyDataUserId, id);
    yield put(getDispatchingCompanyUserIdSuccess(response));
  } catch (error) {
    yield put(getDispatchingCompanyUserIdFail(error))
  }
}

function* onAddNewDispatchingCompany({ payload: data }) {
  try {
      const response = yield call(addNewDataDispatchingCompany, data);
      yield put(setDispatchingCompanySuccess(response));
      toast.success("DispatchingCompany Added Successfully", { autoClose: 2000 });
      yield call(refreshDispatchingCompanyData);
  } catch (error) {
      yield put(setDispatchingCompanyFail(error));
      toast.error("DispatchingCompany Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateDispatchingCompany({ payload: data }) {
  try {
      const response = yield call(updateDataDispatchingCompany, data)
      yield put(updateDispatchingCompanySuccess(response));
      toast.success("DispatchingCompany Updated Successfully", { autoClose: 2000 });
      yield call(refreshDispatchingCompanyData);
  } catch (error) {
      yield put(updateDispatchingCompanyFail(error))
      toast.error("DispatchingCompany Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteDispatchingCompany({ payload: id }) {
  try {
      const response = yield call(deleteDataDispatchingCompany, id)
      yield put(deleteDispatchingCompanySuccess(response));
      toast.success("DispatchingCompany Delete Successfully", { autoClose: 2000 });
      yield call(refreshDispatchingCompanyData);
  } catch (error) {
      yield put(deleteDispatchingCompanyFail(error))
      toast.error("DispatchingCompany Delete Failed", { autoClose: 2000 });
  }
}

function* refreshDispatchingCompanyData() {
  const response = yield call(getDispatchingCompanyDataAll);
  yield put(getDispatchingCompanyAllSuccess(response));
}
                                      

function* DispatchingCompanySaga() {
  yield takeLatest(GET_DISPATCHINGCOMPANY_ALL, fetDispatchingCompanyData)
  yield takeLatest(GET_DISPATCHINGCOMPANY_USERID, fetDispatchingCompanyDataUserId)
  yield takeLatest(SET_DISPATCHINGCOMPANY, onAddNewDispatchingCompany)
  yield takeLatest(UPDATE_DISPATCHINGCOMPANY, onUpdateDispatchingCompany)
  yield takeLatest(DELETE_DISPATCHINGCOMPANY, onDeleteDispatchingCompany)
}
                                      
export default DispatchingCompanySaga;