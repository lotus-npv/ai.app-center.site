import {
  GET_SYNDICATION_ALL,
  GET_SYNDICATION_ALL_SUCCESS,
  GET_SYNDICATION_ALL_FAIL,
  GET_SYNDICATION_USERID,
  GET_SYNDICATION_USERID_SUCCESS,
  GET_SYNDICATION_USERID_FAIL,
  GET_SYNDICATION_ID,
  GET_SYNDICATION_ID_SUCCESS,
  GET_SYNDICATION_ID_FAIL,
  SET_SYNDICATION,
  SET_SYNDICATION_SUCCESS,
  SET_SYNDICATION_FAIL,
  UPDATE_SYNDICATION,
  UPDATE_SYNDICATION_SUCCESS,
  UPDATE_SYNDICATION_FAIL,
  DELETE_SYNDICATION,
  DELETE_SYNDICATION_SUCCESS,
  DELETE_SYNDICATION_FAIL
} from "./actionTypes";

export const getSyndicationAll = () => ({
  type: GET_SYNDICATION_ALL,
});

export const getSyndicationAllSuccess = data => ({
  type: GET_SYNDICATION_ALL_SUCCESS,
  payload: data,
});

export const getSyndicationAllFail = error => ({
  type: GET_SYNDICATION_ALL_FAIL,
  payload: error,
});

export const getSyndicationUserId = (id) => ({
  type: GET_SYNDICATION_USERID,
  payload: id
});

export const getSyndicationUserIdSuccess = data => ({
  type: GET_SYNDICATION_USERID_SUCCESS,
  payload: data,
});

export const getSyndicationUserIdFail = error => ({
  type: GET_SYNDICATION_USERID_FAIL,
  payload: error,
});

export const getSyndicationId = () => ({
  type: GET_SYNDICATION_ID,
});

export const getSyndicationIdSuccess = data => ({
  type: GET_SYNDICATION_ID_SUCCESS,
  payload: data,
});

export const getSyndicationIdFail = error => ({
  type: GET_SYNDICATION_ID_FAIL,
  payload: error,
});

export const setSyndication = data => ({
  type: SET_SYNDICATION,
  payload: data
});

export const setSyndicationSuccess = data => ({
  type: SET_SYNDICATION_SUCCESS,
  payload: data,
});

export const setSyndicationFail = error => ({
  type: SET_SYNDICATION_FAIL,
  payload: error,
});

export const updateSyndication = (data) => ({
  type: UPDATE_SYNDICATION,
  payload: data
});

export const updateSyndicationSuccess = data => ({
  type: UPDATE_SYNDICATION_SUCCESS,
  payload: data,
});

export const updateSyndicationFail = error => ({
  type: UPDATE_SYNDICATION_FAIL,
  payload: error,
});

export const deleteSyndication = (data) => ({
  type: DELETE_SYNDICATION,
  payload: data
});

export const deleteSyndicationSuccess = data => ({
  type: DELETE_SYNDICATION_SUCCESS,
  payload: data,
});

export const deleteSyndicationFail = error => ({
  type: DELETE_SYNDICATION_FAIL,
  payload: error,
});