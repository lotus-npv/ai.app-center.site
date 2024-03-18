import {
  GET_STATUSDETAIL_ALL,
  GET_STATUSDETAIL_ALL_SUCCESS,
  GET_STATUSDETAIL_ALL_FAIL,
  GET_STATUSDETAIL_ID,
  GET_STATUSDETAIL_ID_SUCCESS,
  GET_STATUSDETAIL_ID_FAIL,
  SET_STATUSDETAIL,
  SET_STATUSDETAIL_SUCCESS,
  SET_STATUSDETAIL_FAIL,
  UPDATE_STATUSDETAIL,
  UPDATE_STATUSDETAIL_SUCCESS,
  UPDATE_STATUSDETAIL_FAIL,
  DELETE_STATUSDETAIL,
  DELETE_STATUSDETAIL_SUCCESS,
  DELETE_STATUSDETAIL_FAIL
} from "./actionTypes";

export const getStatusDetailAll = () => ({
  type: GET_STATUSDETAIL_ALL,
});

export const getStatusDetailAllSuccess = data => ({
  type: GET_STATUSDETAIL_ALL_SUCCESS,
  payload: data,
});

export const getStatusDetailAllFail = error => ({
  type: GET_STATUSDETAIL_ALL_FAIL,
  payload: error,
});

export const getStatusDetailId = id => ({
  type: GET_STATUSDETAIL_ID,
  payload: id,
});

export const getStatusDetailIdSuccess = data => ({
  type: GET_STATUSDETAIL_ID_SUCCESS,
  payload: data,
});

export const getStatusDetailIdFail = error => ({
  type: GET_STATUSDETAIL_ID_FAIL,
  payload: error,
});

export const setStatusDetail = data => ({
  type: SET_STATUSDETAIL,
  payload: data
});

export const setStatusDetailSuccess = data => ({
  type: SET_STATUSDETAIL_SUCCESS,
  payload: data,
});

export const setStatusDetailFail = error => ({
  type: SET_STATUSDETAIL_FAIL,
  payload: error,
});

export const updateStatusDetail = (data) => ({
  type: UPDATE_STATUSDETAIL,
  payload: data
});

export const updateStatusDetailSuccess = data => ({
  type: UPDATE_STATUSDETAIL_SUCCESS,
  payload: data,
});

export const updateStatusDetailFail = error => ({
  type: UPDATE_STATUSDETAIL_FAIL,
  payload: error,
});

export const deleteStatusDetail = (data) => ({
  type: DELETE_STATUSDETAIL,
  payload: data
});

export const deleteStatusDetailSuccess = data => ({
  type: DELETE_STATUSDETAIL_SUCCESS,
  payload: data,
});

export const deleteStatusDetailFail = error => ({
  type: DELETE_STATUSDETAIL_FAIL,
  payload: error,
});