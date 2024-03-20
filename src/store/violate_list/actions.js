import {
  GET_VIOLATELIST_ALL,
  GET_VIOLATELIST_ALL_SUCCESS,
  GET_VIOLATELIST_ALL_FAIL,
  GET_VIOLATELIST_ID,
  GET_VIOLATELIST_ID_SUCCESS,
  GET_VIOLATELIST_ID_FAIL,
  SET_VIOLATELIST,
  SET_VIOLATELIST_SUCCESS,
  SET_VIOLATELIST_FAIL,
  UPDATE_VIOLATELIST,
  UPDATE_VIOLATELIST_SUCCESS,
  UPDATE_VIOLATELIST_FAIL,
  DELETE_VIOLATELIST,
  DELETE_VIOLATELIST_SUCCESS,
  DELETE_VIOLATELIST_FAIL
} from "./actionTypes";

export const getViolateListAll = () => ({
  type: GET_VIOLATELIST_ALL,
});

export const getViolateListAllSuccess = data => ({
  type: GET_VIOLATELIST_ALL_SUCCESS,
  payload: data,
});

export const getViolateListAllFail = error => ({
  type: GET_VIOLATELIST_ALL_FAIL,
  payload: error,
});

export const getViolateListId = id => ({
  type: GET_VIOLATELIST_ID,
  payload: id,
});

export const getViolateListIdSuccess = data => ({
  type: GET_VIOLATELIST_ID_SUCCESS,
  payload: data,
});

export const getViolateListIdFail = error => ({
  type: GET_VIOLATELIST_ID_FAIL,
  payload: error,
});

export const setViolateList = data => ({
  type: SET_VIOLATELIST,
  payload: data
});

export const setViolateListSuccess = data => ({
  type: SET_VIOLATELIST_SUCCESS,
  payload: data,
});

export const setViolateListFail = error => ({
  type: SET_VIOLATELIST_FAIL,
  payload: error,
});

export const updateViolateList = (data) => ({
  type: UPDATE_VIOLATELIST,
  payload: data
});

export const updateViolateListSuccess = data => ({
  type: UPDATE_VIOLATELIST_SUCCESS,
  payload: data,
});

export const updateViolateListFail = error => ({
  type: UPDATE_VIOLATELIST_FAIL,
  payload: error,
});

export const deleteViolateList = (data) => ({
  type: DELETE_VIOLATELIST,
  payload: data
});

export const deleteViolateListSuccess = data => ({
  type: DELETE_VIOLATELIST_SUCCESS,
  payload: data,
});

export const deleteViolateListFail = error => ({
  type: DELETE_VIOLATELIST_FAIL,
  payload: error,
});