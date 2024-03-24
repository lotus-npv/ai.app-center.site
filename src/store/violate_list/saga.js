import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_VIOLATELIST_ALL,GET_VIOLATELIST_ID, SET_VIOLATELIST, UPDATE_VIOLATELIST,DELETE_VIOLATELIST
} from "./actionTypes"
import {
    getViolateListAllFail,
    getViolateListAllSuccess,
    getViolateListIdSuccess,
    getViolateListIdFail,
    setViolateListSuccess,
    setViolateListFail,
    updateViolateListSuccess,
    updateViolateListFail,
    deleteViolateListSuccess,
    deleteViolateListFail
} from "./actions"
                                      
import { getViolateListDataAll,getViolateListDataId ,addNewDataViolateList, updateDataViolateList, deleteDataViolateList } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetViolateListData() {
  try {
    const response = yield call(getViolateListDataAll);
    yield put(getViolateListAllSuccess(response));
  } catch (error) {
    yield put(getViolateListAllFail(error))
  }
}

function* fetViolateListDataId({payload: id}) {
  try {
    const response = yield call(getViolateListDataId, id);
    yield put(getViolateListIdSuccess(response));
  } catch (error) {
    yield put(getViolateListIdFail(error))
  }
}

function* onAddNewViolateList({ payload: data }) {
  try {
      const response = yield call(addNewDataViolateList, data);
      yield put(setViolateListSuccess(response));
      toast.success("ViolateList Added Successfully", { autoClose: 2000 });
      console.log(response);
      yield call(refreshViolateListData);
  } catch (error) {
      yield put(setViolateListFail(error));
      toast.error("ViolateList Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateViolateList({ payload: data }) {
  try {
      const response = yield call(updateDataViolateList, data)
      yield put(updateViolateListSuccess(response));
      toast.success("ViolateList Updated Successfully", { autoClose: 2000 });
      yield call(refreshViolateListData);
  } catch (error) {
      yield put(updateViolateListFail(error))
      toast.error("ViolateList Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteViolateList({ payload: id }) {
  try {
      const response = yield call(deleteDataViolateList, id)
      yield put(deleteViolateListSuccess(response));
      toast.success("ViolateList Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteViolateListFail(error))
      toast.error("ViolateList Delete Failed", { autoClose: 2000 });
  }
}

function* refreshViolateListData() {
  const response = yield call(getViolateListDataAll);
  yield put(getViolateListAllSuccess(response));
}
                                      

function* ViolateListSaga() {
  yield takeEvery(GET_VIOLATELIST_ALL, fetViolateListData)
  yield takeEvery(GET_VIOLATELIST_ID, fetViolateListDataId)
  yield takeEvery(SET_VIOLATELIST, onAddNewViolateList)
  yield takeEvery(UPDATE_VIOLATELIST, onUpdateViolateList)
  yield takeEvery(DELETE_VIOLATELIST, onDeleteViolateList)
}
                                      
export default ViolateListSaga;