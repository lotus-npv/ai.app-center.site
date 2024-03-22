import {
  GET_STATUSOFRESIDENCE_ALL,
  GET_STATUSOFRESIDENCE_ALL_SUCCESS,
  GET_STATUSOFRESIDENCE_ALL_FAIL,
  GET_STATUSOFRESIDENCE_ID,
  GET_STATUSOFRESIDENCE_ID_SUCCESS,
  GET_STATUSOFRESIDENCE_ID_FAIL,
  SET_STATUSOFRESIDENCE,
  SET_STATUSOFRESIDENCE_SUCCESS,
  SET_STATUSOFRESIDENCE_FAIL,
  UPDATE_STATUSOFRESIDENCE,
  UPDATE_STATUSOFRESIDENCE_SUCCESS,
  UPDATE_STATUSOFRESIDENCE_FAIL,
  DELETE_STATUSOFRESIDENCE,
  DELETE_STATUSOFRESIDENCE_SUCCESS,
  DELETE_STATUSOFRESIDENCE_FAIL
} from "./actionTypes";

export const getStatusOfResidenceAll = () => ({
  type: GET_STATUSOFRESIDENCE_ALL,
});

export const getStatusOfResidenceAllSuccess = data => ({
  type: GET_STATUSOFRESIDENCE_ALL_SUCCESS,
  payload: data,
});

export const getStatusOfResidenceAllFail = error => ({
  type: GET_STATUSOFRESIDENCE_ALL_FAIL,
  payload: error,
});

export const getStatusOfResidenceId = id => ({
  type: GET_STATUSOFRESIDENCE_ID,
  payload: id,
});

export const getStatusOfResidenceIdSuccess = data => ({
  type: GET_STATUSOFRESIDENCE_ID_SUCCESS,
  payload: data,
});

export const getStatusOfResidenceIdFail = error => ({
  type: GET_STATUSOFRESIDENCE_ID_FAIL,
  payload: error,
});

export const setStatusOfResidence = data => ({
  type: SET_STATUSOFRESIDENCE,
  payload: data
});

export const setStatusOfResidenceSuccess = data => ({
  type: SET_STATUSOFRESIDENCE_SUCCESS,
  payload: data,
});

export const setStatusOfResidenceFail = error => ({
  type: SET_STATUSOFRESIDENCE_FAIL,
  payload: error,
});

export const updateStatusOfResidence = (data) => ({
  type: UPDATE_STATUSOFRESIDENCE,
  payload: data
});

export const updateStatusOfResidenceSuccess = data => ({
  type: UPDATE_STATUSOFRESIDENCE_SUCCESS,
  payload: data,
});

export const updateStatusOfResidenceFail = error => ({
  type: UPDATE_STATUSOFRESIDENCE_FAIL,
  payload: error,
});

export const deleteStatusOfResidence = (data) => ({
  type: DELETE_STATUSOFRESIDENCE,
  payload: data
});

export const deleteStatusOfResidenceSuccess = data => ({
  type: DELETE_STATUSOFRESIDENCE_SUCCESS,
  payload: data,
});

export const deleteStatusOfResidenceFail = error => ({
  type: DELETE_STATUSOFRESIDENCE_FAIL,
  payload: error,
});