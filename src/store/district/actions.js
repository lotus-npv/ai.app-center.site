import {
  GET_DISTRICT_ALL,
  GET_DISTRICT_ALL_SUCCESS,
  GET_DISTRICT_ALL_FAIL,
  GET_DISTRICT_ID,
  GET_DISTRICT_ID_SUCCESS,
  GET_DISTRICT_ID_FAIL,
  GET_DISTRICT_BY_PROVINCE_ID,
  GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
  GET_DISTRICT_BY_PROVINCE_ID_FAIL,
  SET_DISTRICT,
  SET_DISTRICT_SUCCESS,
  SET_DISTRICT_FAIL,
  UPDATE_DISTRICT,
  UPDATE_DISTRICT_SUCCESS,
  UPDATE_DISTRICT_FAIL,
  DELETE_DISTRICT,
  DELETE_DISTRICT_SUCCESS,
  DELETE_DISTRICT_FAIL
} from "./actionTypes";

export const getDistrictAll = () => ({
  type: GET_DISTRICT_ALL,
});

export const getDistrictAllSuccess = data => ({
  type: GET_DISTRICT_ALL_SUCCESS,
  payload: data,
});

export const getDistrictAllFail = error => ({
  type: GET_DISTRICT_ALL_FAIL,
  payload: error,
});

export const getDistrictId = id => ({
  type: GET_DISTRICT_ID,
  payload: id,
});

export const getDistrictIdSuccess = data => ({
  type: GET_DISTRICT_ID_SUCCESS,
  payload: data,
});

export const getDistrictIdFail = error => ({
  type: GET_DISTRICT_ID_FAIL,
  payload: error,
});

export const getDistrictByProvinceId = id => ({
  type: GET_DISTRICT_BY_PROVINCE_ID,
  payload: id,
});

export const getDistrictByProvinceIdSuccess = data => ({
  type: GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
  payload: data,
});

export const getDistrictByProvinceIdFail = error => ({
  type: GET_DISTRICT_BY_PROVINCE_ID_FAIL,
  payload: error,
});

export const setDistrict = data => ({
  type: SET_DISTRICT,
  payload: data
});

export const setDistrictSuccess = data => ({
  type: SET_DISTRICT_SUCCESS,
  payload: data,
});

export const setDistrictFail = error => ({
  type: SET_DISTRICT_FAIL,
  payload: error,
});

export const updateDistrict = (data) => ({
  type: UPDATE_DISTRICT,
  payload: data
});

export const updateDistrictSuccess = data => ({
  type: UPDATE_DISTRICT_SUCCESS,
  payload: data,
});

export const updateDistrictFail = error => ({
  type: UPDATE_DISTRICT_FAIL,
  payload: error,
});

export const deleteDistrict = (data) => ({
  type: DELETE_DISTRICT,
  payload: data
});

export const deleteDistrictSuccess = data => ({
  type: DELETE_DISTRICT_SUCCESS,
  payload: data,
});

export const deleteDistrictFail = error => ({
  type: DELETE_DISTRICT_FAIL,
  payload: error,
});