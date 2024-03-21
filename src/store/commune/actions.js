import {
  GET_COMMUNE_ALL,
  GET_COMMUNE_ALL_SUCCESS,
  GET_COMMUNE_ALL_FAIL,
  GET_COMMUNE_ID,
  GET_COMMUNE_ID_SUCCESS,
  GET_COMMUNE_ID_FAIL,
  GET_COMMUNE_BY_DISTRICT_ID,
  GET_COMMUNE_BY_DISTRICT_ID_SUCCESS,
  GET_COMMUNE_BY_DISTRICT_ID_FAIL,
  SET_COMMUNE,
  SET_COMMUNE_SUCCESS,
  SET_COMMUNE_FAIL,
  UPDATE_COMMUNE,
  UPDATE_COMMUNE_SUCCESS,
  UPDATE_COMMUNE_FAIL,
  DELETE_COMMUNE,
  DELETE_COMMUNE_SUCCESS,
  DELETE_COMMUNE_FAIL
} from "./actionTypes";

export const getCommuneAll = () => ({
  type: GET_COMMUNE_ALL,
});

export const getCommuneAllSuccess = data => ({
  type: GET_COMMUNE_ALL_SUCCESS,
  payload: data,
});

export const getCommuneAllFail = error => ({
  type: GET_COMMUNE_ALL_FAIL,
  payload: error,
});

export const getCommuneId = id => ({
  type: GET_COMMUNE_ID,
  payload: id,
});

export const getCommuneIdSuccess = data => ({
  type: GET_COMMUNE_ID_SUCCESS,
  payload: data,
});

export const getCommuneIdFail = error => ({
  type: GET_COMMUNE_ID_FAIL,
  payload: error,
});

export const getCommuneByDistrictId = id => ({
  type: GET_COMMUNE_BY_DISTRICT_ID,
  payload: id,
});

export const getCommuneByDistrictIdSuccess = data => ({
  type: GET_COMMUNE_BY_DISTRICT_ID_SUCCESS,
  payload: data,
});

export const getCommuneByDistrictIdFail = error => ({
  type: GET_COMMUNE_BY_DISTRICT_ID_FAIL,
  payload: error,
});

export const setCommune = data => ({
  type: SET_COMMUNE,
  payload: data
});

export const setCommuneSuccess = data => ({
  type: SET_COMMUNE_SUCCESS,
  payload: data,
});

export const setCommuneFail = error => ({
  type: SET_COMMUNE_FAIL,
  payload: error,
});

export const updateCommune = (data) => ({
  type: UPDATE_COMMUNE,
  payload: data
});

export const updateCommuneSuccess = data => ({
  type: UPDATE_COMMUNE_SUCCESS,
  payload: data,
});

export const updateCommuneFail = error => ({
  type: UPDATE_COMMUNE_FAIL,
  payload: error,
});

export const deleteCommune = (data) => ({
  type: DELETE_COMMUNE,
  payload: data
});

export const deleteCommuneSuccess = data => ({
  type: DELETE_COMMUNE_SUCCESS,
  payload: data,
});

export const deleteCommuneFail = error => ({
  type: DELETE_COMMUNE_FAIL,
  payload: error,
});