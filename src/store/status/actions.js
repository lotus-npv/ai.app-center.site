import {
  GET_STATUS_ALL,
  GET_STATUS_ALL_SUCCESS,
  GET_STATUS_ALL_FAIL,
  GET_STATUS_ID,
  GET_STATUS_ID_SUCCESS,
  GET_STATUS_ID_FAIL,
  SET_STATUS,
  SET_STATUS_SUCCESS,
  SET_STATUS_FAIL,
  UPDATE_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  DELETE_STATUS,
  DELETE_STATUS_SUCCESS,
  DELETE_STATUS_FAIL
} from "./actionTypes";

export const getStatusAll = () => ({
  type: GET_STATUS_ALL,
});

export const getStatusAllSuccess = data => ({
  type: GET_STATUS_ALL_SUCCESS,
  payload: data,
});

export const getStatusAllFail = error => ({
  type: GET_STATUS_ALL_FAIL,
  payload: error,
});

export const getStatusId = (id) => ({
  type: GET_STATUS_ID,
  payload: id
});

export const getStatusIdSuccess = data => ({
  type: GET_STATUS_ID_SUCCESS,
  payload: data,
});

export const getStatusIdFail = error => ({
  type: GET_STATUS_ID_FAIL,
  payload: error,
});

export const setStatus = data => ({
  type: SET_STATUS,
  payload: data
});

export const setStatusSuccess = data => ({
  type: SET_STATUS_SUCCESS,
  payload: data,
});

export const setStatusFail = error => ({
  type: SET_STATUS_FAIL,
  payload: error,
});

export const updateStatus = (data) => ({
  type: UPDATE_STATUS,
  payload: data
});

export const updateStatusSuccess = data => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: data,
});

export const updateStatusFail = error => ({
  type: UPDATE_STATUS_FAIL,
  payload: error,
});

export const deleteStatus = (data) => ({
  type: DELETE_STATUS,
  payload: data
});

export const deleteStatusSuccess = data => ({
  type: DELETE_STATUS_SUCCESS,
  payload: data,
});

export const deleteStatusFail = error => ({
  type: DELETE_STATUS_FAIL,
  payload: error,
});