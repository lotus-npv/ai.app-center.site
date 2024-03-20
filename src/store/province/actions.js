import {
  GET_PROVINCE_ALL,
  GET_PROVINCE_ALL_SUCCESS,
  GET_PROVINCE_ALL_FAIL,
  GET_PROVINCE_ID,
  GET_PROVINCE_ID_SUCCESS,
  GET_PROVINCE_ID_FAIL,
  SET_PROVINCE,
  SET_PROVINCE_SUCCESS,
  SET_PROVINCE_FAIL,
  UPDATE_PROVINCE,
  UPDATE_PROVINCE_SUCCESS,
  UPDATE_PROVINCE_FAIL,
  DELETE_PROVINCE,
  DELETE_PROVINCE_SUCCESS,
  DELETE_PROVINCE_FAIL
} from "./actionTypes";

export const getProvinceAll = () => ({
  type: GET_PROVINCE_ALL,
});

export const getProvinceAllSuccess = data => ({
  type: GET_PROVINCE_ALL_SUCCESS,
  payload: data,
});

export const getProvinceAllFail = error => ({
  type: GET_PROVINCE_ALL_FAIL,
  payload: error,
});

export const getProvinceId = id => ({
  type: GET_PROVINCE_ID,
  payload: id,
});

export const getProvinceIdSuccess = data => ({
  type: GET_PROVINCE_ID_SUCCESS,
  payload: data,
});

export const getProvinceIdFail = error => ({
  type: GET_PROVINCE_ID_FAIL,
  payload: error,
});

export const setProvince = data => ({
  type: SET_PROVINCE,
  payload: data
});

export const setProvinceSuccess = data => ({
  type: SET_PROVINCE_SUCCESS,
  payload: data,
});

export const setProvinceFail = error => ({
  type: SET_PROVINCE_FAIL,
  payload: error,
});

export const updateProvince = (data) => ({
  type: UPDATE_PROVINCE,
  payload: data
});

export const updateProvinceSuccess = data => ({
  type: UPDATE_PROVINCE_SUCCESS,
  payload: data,
});

export const updateProvinceFail = error => ({
  type: UPDATE_PROVINCE_FAIL,
  payload: error,
});

export const deleteProvince = (data) => ({
  type: DELETE_PROVINCE,
  payload: data
});

export const deleteProvinceSuccess = data => ({
  type: DELETE_PROVINCE_SUCCESS,
  payload: data,
});

export const deleteProvinceFail = error => ({
  type: DELETE_PROVINCE_FAIL,
  payload: error,
});