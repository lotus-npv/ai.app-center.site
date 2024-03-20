import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_VIOLATETYPE_ALL,GET_VIOLATETYPE_ID, SET_VIOLATETYPE, UPDATE_VIOLATETYPE,DELETE_VIOLATETYPE
} from "./actionTypes"
import {
    getViolateTypeAllFail,
    getViolateTypeAllSuccess,
    getViolateTypeIdSuccess,
    getViolateTypeIdFail,
    setViolateTypeSuccess,
    setViolateTypeFail,
    updateViolateTypeSuccess,
    updateViolateTypeFail,
    deleteViolateTypeSuccess,
    deleteViolateTypeFail
} from "./actions"
                                      
import { getViolateTypeDataAll,getViolateTypeDataId ,addNewDataViolateType, updateDataViolateType, deleteDataViolateType } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetViolateTypeData() {
  try {
    const response = yield call(getViolateTypeDataAll);
    yield put(getViolateTypeAllSuccess(response));
  } catch (error) {
    yield put(getViolateTypeAllFail(error))
  }
}

function* fetViolateTypeDataId({payload: id}) {
  try {
    const response = yield call(getViolateTypeDataId, id);
    yield put(getViolateTypeIdSuccess(response));
  } catch (error) {
    yield put(getViolateTypeIdFail(error))
  }
}

function* onAddNewViolateType({ payload: data }) {
  try {
      const response = yield call(addNewDataViolateType, data);
      yield put(setViolateTypeSuccess(response));
      toast.success("ViolateType Added Successfully", { autoClose: 2000 });
      yield call(refreshViolateTypeData);
  } catch (error) {
      yield put(setViolateTypeFail(error));
      toast.error("ViolateType Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateViolateType({ payload: data }) {
  try {
      const response = yield call(updateDataViolateType, data)
      yield put(updateViolateTypeSuccess(response));
      toast.success("ViolateType Updated Successfully", { autoClose: 2000 });
      yield call(refreshViolateTypeData);
  } catch (error) {
      yield put(updateViolateTypeFail(error))
      toast.error("ViolateType Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteViolateType({ payload: id }) {
  try {
      const response = yield call(deleteDataViolateType, id)
      yield put(deleteViolateTypeSuccess(response));
      toast.success("ViolateType Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteViolateTypeFail(error))
      toast.error("ViolateType Delete Failed", { autoClose: 2000 });
  }
}

function* refreshViolateTypeData() {
  const response = yield call(getViolateTypeDataAll);
  yield put(getViolateTypeAllSuccess(response));
}
                                      

function* ViolateTypeSaga() {
  yield takeEvery(GET_VIOLATETYPE_ALL, fetViolateTypeData)
  yield takeEvery(GET_VIOLATETYPE_ID, fetViolateTypeDataId)
  yield takeEvery(SET_VIOLATETYPE, onAddNewViolateType)
  yield takeEvery(UPDATE_VIOLATETYPE, onUpdateViolateType)
  yield takeEvery(DELETE_VIOLATETYPE, onDeleteViolateType)
}
                                      
export default ViolateTypeSaga;