import { takeEvery, put, call,all,fork, takeLatest  } from "redux-saga/effects";


// Login Redux States
import {
  GET_EMPLOYEE_ALL,GET_EMPLOYEE_ID, SET_EMPLOYEE, UPDATE_EMPLOYEE,DELETE_EMPLOYEE
} from "./actionTypes"
import {
    getEmployeeAllFail,
    getEmployeeAllSuccess,
    getEmployeeIdSuccess,
    getEmployeeIdFail,
    setEmployeeSuccess,
    setEmployeeFail,
    updateEmployeeSuccess,
    updateEmployeeFail,
    deleteEmployeeSuccess,
    deleteEmployeeFail
} from "./actions"
                                      
import { getEmployeeDataAll,getEmployeeDataId ,addNewDataEmployee, updateDataEmployee, deleteDataEmployee } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetEmployeeData() {
  try {
    const response = yield call(getEmployeeDataAll);
    yield put(getEmployeeAllSuccess(response));
  } catch (error) {
    yield put(getEmployeeAllFail(error))
  }
}

function* fetEmployeeDataId({payload: id}) {
  try {
    const response = yield call(getEmployeeDataId, id);
    yield put(getEmployeeIdSuccess(response));
  } catch (error) {
    yield put(getEmployeeIdFail(error))
  }
}

function* onAddNewEmployee({ payload: data }) {
  try {
      const response = yield call(addNewDataEmployee, data);
      yield put(setEmployeeSuccess(response));
      toast.success("Employee Added Successfully", { autoClose: 2000 });
      yield call(refreshEmployeeData);
  } catch (error) {
      yield put(setEmployeeFail(error));
      toast.error("Employee Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateEmployee({ payload: data }) {
  try {
      const response = yield call(updateDataEmployee, data)
      yield put(updateEmployeeSuccess(response));
      toast.success("Employee Updated Successfully", { autoClose: 2000 });
      yield call(refreshEmployeeData);
  } catch (error) {
      yield put(updateEmployeeFail(error))
      toast.error("Employee Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteEmployee({ payload: id }) {
  try {
      const response = yield call(deleteDataEmployee, id)
      yield put(deleteEmployeeSuccess(response));
      toast.success("Employee Delete Successfully", { autoClose: 2000 });
  } catch (error) {
      yield put(deleteEmployeeFail(error))
      toast.error("Employee Delete Failed", { autoClose: 2000 });
  }
}

function* refreshEmployeeData() {
  const response = yield call(getEmployeeDataAll);
  yield put(getEmployeeAllSuccess(response));
}
                                      

function* EmployeeSaga() {
  yield takeEvery(GET_EMPLOYEE_ALL, fetEmployeeData)
  yield takeEvery(GET_EMPLOYEE_ID, fetEmployeeDataId)
  yield takeEvery(SET_EMPLOYEE, onAddNewEmployee)
  yield takeEvery(UPDATE_EMPLOYEE, onUpdateEmployee)
  yield takeEvery(DELETE_EMPLOYEE, onDeleteEmployee)
}
                                      
export default EmployeeSaga;