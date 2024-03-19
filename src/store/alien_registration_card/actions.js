import {
  GET_ALIENREGISTRATIONCARD_ALL,
  GET_ALIENREGISTRATIONCARD_ALL_SUCCESS,
  GET_ALIENREGISTRATIONCARD_ALL_FAIL,
  GET_ALIENREGISTRATIONCARD_ALLINFO,
  GET_ALIENREGISTRATIONCARD_ALLINFO_SUCCESS,
  GET_ALIENREGISTRATIONCARD_ALLINFO_FAIL,
  GET_ALIENREGISTRATIONCARD_ID,
  GET_ALIENREGISTRATIONCARD_ID_SUCCESS,
  GET_ALIENREGISTRATIONCARD_ID_FAIL,
  SET_ALIENREGISTRATIONCARD,
  SET_ALIENREGISTRATIONCARD_SUCCESS,
  SET_ALIENREGISTRATIONCARD_FAIL,
  UPDATE_ALIENREGISTRATIONCARD,
  UPDATE_ALIENREGISTRATIONCARD_SUCCESS,
  UPDATE_ALIENREGISTRATIONCARD_FAIL,
  DELETE_ALIENREGISTRATIONCARD,
  DELETE_ALIENREGISTRATIONCARD_SUCCESS,
  DELETE_ALIENREGISTRATIONCARD_FAIL
} from "./actionTypes";

export const getAlienRegistrationCardAll = () => ({
  type: GET_ALIENREGISTRATIONCARD_ALL,
});

export const getAlienRegistrationCardAllSuccess = data => ({
  type: GET_ALIENREGISTRATIONCARD_ALL_SUCCESS,
  payload: data,
});

export const getAlienRegistrationCardAllFail = error => ({
  type: GET_ALIENREGISTRATIONCARD_ALL_FAIL,
  payload: error,
});

export const getAlienRegistrationCardAllInfo = () => ({
  type: GET_ALIENREGISTRATIONCARD_ALLINFO,
});

export const getAlienRegistrationCardAllInfoSuccess = data => ({
  type: GET_ALIENREGISTRATIONCARD_ALLINFO_SUCCESS,
  payload: data,
});

export const getAlienRegistrationCardAllInfoFail = error => ({
  type: GET_ALIENREGISTRATIONCARD_ALLINFO_FAIL,
  payload: error,
});

export const getAlienRegistrationCardId = id => ({
  type: GET_ALIENREGISTRATIONCARD_ID,
  payload: id,
});

export const getAlienRegistrationCardIdSuccess = data => ({
  type: GET_ALIENREGISTRATIONCARD_ID_SUCCESS,
  payload: data,
});

export const getAlienRegistrationCardIdFail = error => ({
  type: GET_ALIENREGISTRATIONCARD_ID_FAIL,
  payload: error,
});

export const setAlienRegistrationCard = data => ({
  type: SET_ALIENREGISTRATIONCARD,
  payload: data
});

export const setAlienRegistrationCardSuccess = data => ({
  type: SET_ALIENREGISTRATIONCARD_SUCCESS,
  payload: data,
});

export const setAlienRegistrationCardFail = error => ({
  type: SET_ALIENREGISTRATIONCARD_FAIL,
  payload: error,
});

export const updateAlienRegistrationCard = (data) => ({
  type: UPDATE_ALIENREGISTRATIONCARD,
  payload: data
});

export const updateAlienRegistrationCardSuccess = data => ({
  type: UPDATE_ALIENREGISTRATIONCARD_SUCCESS,
  payload: data,
});

export const updateAlienRegistrationCardFail = error => ({
  type: UPDATE_ALIENREGISTRATIONCARD_FAIL,
  payload: error,
});

export const deleteAlienRegistrationCard = (data) => ({
  type: DELETE_ALIENREGISTRATIONCARD,
  payload: data
});

export const deleteAlienRegistrationCardSuccess = data => ({
  type: DELETE_ALIENREGISTRATIONCARD_SUCCESS,
  payload: data,
});

export const deleteAlienRegistrationCardFail = error => ({
  type: DELETE_ALIENREGISTRATIONCARD_FAIL,
  payload: error,
});