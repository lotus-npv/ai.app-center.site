import {
  GET_EMPLOYEE_ALL,
  GET_EMPLOYEE_ALL_SUCCESS,
  GET_EMPLOYEE_ALL_FAIL,
  GET_EMPLOYEE_ID,
  GET_EMPLOYEE_ID_SUCCESS,
  GET_EMPLOYEE_ID_FAIL,
  SET_EMPLOYEE,
  SET_EMPLOYEE_SUCCESS,
  SET_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL
} from "./actionTypes";

export const getEmployeeAll = () => ({
  type: GET_EMPLOYEE_ALL,
});

export const getEmployeeAllSuccess = data => ({
  type: GET_EMPLOYEE_ALL_SUCCESS,
  payload: data,
});

export const getEmployeeAllFail = error => ({
  type: GET_EMPLOYEE_ALL_FAIL,
  payload: error,
});

export const getEmployeeId = id => ({
  type: GET_EMPLOYEE_ID,
  payload: id,
});

export const getEmployeeIdSuccess = data => ({
  type: GET_EMPLOYEE_ID_SUCCESS,
  payload: data,
});

export const getEmployeeIdFail = error => ({
  type: GET_EMPLOYEE_ID_FAIL,
  payload: error,
});

export const setEmployee = data => ({
  type: SET_EMPLOYEE,
  payload: data
});

export const setEmployeeSuccess = data => ({
  type: SET_EMPLOYEE_SUCCESS,
  payload: data,
});

export const setEmployeeFail = error => ({
  type: SET_EMPLOYEE_FAIL,
  payload: error,
});

export const updateEmployee = (data) => ({
  type: UPDATE_EMPLOYEE,
  payload: data
});

export const updateEmployeeSuccess = data => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const updateEmployeeFail = error => ({
  type: UPDATE_EMPLOYEE_FAIL,
  payload: error,
});

export const deleteEmployee = (data) => ({
  type: DELETE_EMPLOYEE,
  payload: data
});

export const deleteEmployeeSuccess = data => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const deleteEmployeeFail = error => ({
  type: DELETE_EMPLOYEE_FAIL,
  payload: error,
});