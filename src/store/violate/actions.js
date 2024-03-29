import {
  GET_VIOLATE_ALL,
  GET_VIOLATE_ALL_SUCCESS,
  GET_VIOLATE_ALL_FAIL,
  GET_VIOLATE_USERID,
  GET_VIOLATE_USERID_SUCCESS,
  GET_VIOLATE_USERID_FAIL,
  GET_VIOLATE_ID,
  GET_VIOLATE_ID_SUCCESS,
  GET_VIOLATE_ID_FAIL,
  SET_VIOLATE,
  SET_VIOLATE_SUCCESS,
  SET_VIOLATE_FAIL,
  UPDATE_VIOLATE,
  UPDATE_VIOLATE_SUCCESS,
  UPDATE_VIOLATE_FAIL,
  DELETE_VIOLATE,
  DELETE_VIOLATE_SUCCESS,
  DELETE_VIOLATE_FAIL
} from "./actionTypes";

export const getViolateAll = () => ({
  type: GET_VIOLATE_ALL,
});

export const getViolateAllSuccess = data => ({
  type: GET_VIOLATE_ALL_SUCCESS,
  payload: data,
});

export const getViolateAllFail = error => ({
  type: GET_VIOLATE_ALL_FAIL,
  payload: error,
});
export const getViolateUserId = (id) => ({
  type: GET_VIOLATE_USERID,
  payload: id
});

export const getViolateUserIdSuccess = data => ({
  type: GET_VIOLATE_USERID_SUCCESS,
  payload: data,
});

export const getViolateUserIdFail = error => ({
  type: GET_VIOLATE_USERID_FAIL,
  payload: error,
});

export const getViolateId = id => ({
  type: GET_VIOLATE_ID,
  payload: id,
});

export const getViolateIdSuccess = data => ({
  type: GET_VIOLATE_ID_SUCCESS,
  payload: data,
});

export const getViolateIdFail = error => ({
  type: GET_VIOLATE_ID_FAIL,
  payload: error,
});

export const setViolate = data => ({
  type: SET_VIOLATE,
  payload: data
});

export const setViolateSuccess = data => ({
  type: SET_VIOLATE_SUCCESS,
  payload: data,
});

export const setViolateFail = error => ({
  type: SET_VIOLATE_FAIL,
  payload: error,
});

export const updateViolate = (data) => ({
  type: UPDATE_VIOLATE,
  payload: data
});

export const updateViolateSuccess = data => ({
  type: UPDATE_VIOLATE_SUCCESS,
  payload: data,
});

export const updateViolateFail = error => ({
  type: UPDATE_VIOLATE_FAIL,
  payload: error,
});

export const deleteViolate = (data) => ({
  type: DELETE_VIOLATE,
  payload: data
});

export const deleteViolateSuccess = data => ({
  type: DELETE_VIOLATE_SUCCESS,
  payload: data,
});

export const deleteViolateFail = error => ({
  type: DELETE_VIOLATE_FAIL,
  payload: error,
});