import {
  GET_NATION_ALL,
  GET_NATION_ALL_SUCCESS,
  GET_NATION_ALL_FAIL,
  GET_NATION_ID,
  GET_NATION_ID_SUCCESS,
  GET_NATION_ID_FAIL,
  SET_NATION,
  SET_NATION_SUCCESS,
  SET_NATION_FAIL,
  UPDATE_NATION,
  UPDATE_NATION_SUCCESS,
  UPDATE_NATION_FAIL,
  DELETE_NATION,
  DELETE_NATION_SUCCESS,
  DELETE_NATION_FAIL
} from "./actionTypes";

export const getNationAll = () => ({
  type: GET_NATION_ALL,
});

export const getNationAllSuccess = data => ({
  type: GET_NATION_ALL_SUCCESS,
  payload: data,
});

export const getNationAllFail = error => ({
  type: GET_NATION_ALL_FAIL,
  payload: error,
});

export const getNationId = id => ({
  type: GET_NATION_ID,
  payload: id,
});

export const getNationIdSuccess = data => ({
  type: GET_NATION_ID_SUCCESS,
  payload: data,
});

export const getNationIdFail = error => ({
  type: GET_NATION_ID_FAIL,
  payload: error,
});

export const setNation = data => ({
  type: SET_NATION,
  payload: data
});

export const setNationSuccess = data => ({
  type: SET_NATION_SUCCESS,
  payload: data,
});

export const setNationFail = error => ({
  type: SET_NATION_FAIL,
  payload: error,
});

export const updateNation = (data) => ({
  type: UPDATE_NATION,
  payload: data
});

export const updateNationSuccess = data => ({
  type: UPDATE_NATION_SUCCESS,
  payload: data,
});

export const updateNationFail = error => ({
  type: UPDATE_NATION_FAIL,
  payload: error,
});

export const deleteNation = (data) => ({
  type: DELETE_NATION,
  payload: data
});

export const deleteNationSuccess = data => ({
  type: DELETE_NATION_SUCCESS,
  payload: data,
});

export const deleteNationFail = error => ({
  type: DELETE_NATION_FAIL,
  payload: error,
});