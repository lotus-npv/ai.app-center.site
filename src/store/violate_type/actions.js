import {
  GET_VIOLATETYPE_ALL,
  GET_VIOLATETYPE_ALL_SUCCESS,
  GET_VIOLATETYPE_ALL_FAIL,
  GET_VIOLATETYPE_ID,
  GET_VIOLATETYPE_ID_SUCCESS,
  GET_VIOLATETYPE_ID_FAIL,
  SET_VIOLATETYPE,
  SET_VIOLATETYPE_SUCCESS,
  SET_VIOLATETYPE_FAIL,
  UPDATE_VIOLATETYPE,
  UPDATE_VIOLATETYPE_SUCCESS,
  UPDATE_VIOLATETYPE_FAIL,
  DELETE_VIOLATETYPE,
  DELETE_VIOLATETYPE_SUCCESS,
  DELETE_VIOLATETYPE_FAIL
} from "./actionTypes";

export const getViolateTypeAll = () => ({
  type: GET_VIOLATETYPE_ALL,
});

export const getViolateTypeAllSuccess = data => ({
  type: GET_VIOLATETYPE_ALL_SUCCESS,
  payload: data,
});

export const getViolateTypeAllFail = error => ({
  type: GET_VIOLATETYPE_ALL_FAIL,
  payload: error,
});

export const getViolateTypeId = id => ({
  type: GET_VIOLATETYPE_ID,
  payload: id,
});

export const getViolateTypeIdSuccess = data => ({
  type: GET_VIOLATETYPE_ID_SUCCESS,
  payload: data,
});

export const getViolateTypeIdFail = error => ({
  type: GET_VIOLATETYPE_ID_FAIL,
  payload: error,
});

export const setViolateType = data => ({
  type: SET_VIOLATETYPE,
  payload: data
});

export const setViolateTypeSuccess = data => ({
  type: SET_VIOLATETYPE_SUCCESS,
  payload: data,
});

export const setViolateTypeFail = error => ({
  type: SET_VIOLATETYPE_FAIL,
  payload: error,
});

export const updateViolateType = (data) => ({
  type: UPDATE_VIOLATETYPE,
  payload: data
});

export const updateViolateTypeSuccess = data => ({
  type: UPDATE_VIOLATETYPE_SUCCESS,
  payload: data,
});

export const updateViolateTypeFail = error => ({
  type: UPDATE_VIOLATETYPE_FAIL,
  payload: error,
});

export const deleteViolateType = (data) => ({
  type: DELETE_VIOLATETYPE,
  payload: data
});

export const deleteViolateTypeSuccess = data => ({
  type: DELETE_VIOLATETYPE_SUCCESS,
  payload: data,
});

export const deleteViolateTypeFail = error => ({
  type: DELETE_VIOLATETYPE_FAIL,
  payload: error,
});