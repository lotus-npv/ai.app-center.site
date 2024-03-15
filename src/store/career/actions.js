import {
  GET_CAREER_ALL,
  GET_CAREER_ALL_SUCCESS,
  GET_CAREER_ALL_FAIL,
  GET_CAREER_ID,
  GET_CAREER_ID_SUCCESS,
  GET_CAREER_ID_FAIL,
  SET_CAREER,
  SET_CAREER_SUCCESS,
  SET_CAREER_FAIL,
  UPDATE_CAREER,
  UPDATE_CAREER_SUCCESS,
  UPDATE_CAREER_FAIL,
} from "./actionTypes";

export const getCareerAll = () => ({
  type: GET_CAREER_ALL,
});

export const getCareerAllSuccess = data => ({
  type: GET_CAREER_ALL_SUCCESS,
  payload: data,
});

export const getCareerAllFail = error => ({
  type: GET_CAREER_ALL_FAIL,
  payload: error,
});

export const getCareerId = () => ({
  type: GET_CAREER_ID,
});

export const getCareerIdSuccess = data => ({
  type: GET_CAREER_ID_SUCCESS,
  payload: data,
});

export const getCareerIdFail = error => ({
  type: GET_CAREER_ID_FAIL,
  payload: error,
});

export const setCareer = data => ({
  type: SET_CAREER,
  payload: data
});

export const setCareerSuccess = data => ({
  type: SET_CAREER_SUCCESS,
  payload: data,
});

export const setCareerFail = error => ({
  type: SET_CAREER_FAIL,
  payload: error,
});

export const updateCareer = () => ({
  type: UPDATE_CAREER,
});

export const updateCareerSuccess = data => ({
  type: UPDATE_CAREER_SUCCESS,
  payload: data,
});

export const updateCareerFail = error => ({
  type: UPDATE_CAREER_FAIL,
  payload: error,
});