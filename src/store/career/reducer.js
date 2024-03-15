import {
  GET_CAREER_ALL_SUCCESS,
  GET_CAREER_ALL_FAIL,
  GET_CAREER_ID_SUCCESS,
  GET_CAREER_ID_FAIL,
  SET_CAREER_SUCCESS,
  SET_CAREER_FAIL,
  UPDATE_CAREER_SUCCESS,
  UPDATE_CAREER_FAIL,
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    data: {}
  };
  
  const Career = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_CAREER_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_CAREER_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:

      
        return state;
    }
  };
  
  export default Career;