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
  DELETE_CAREER_SUCCESS,
  DELETE_CAREER_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: {},
    data: {}
  };
  
  const Career = (state = INIT_STATE, action) => {
    switch (action.type) {
      // case GET_CAREER_ALL:
      //   return {
      //     ...state,
      //   };
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
      // case GET_CAREER_ID:
      //   return {
      //     ...state,
      //     dataId: action.payload,
      //   };
      case GET_CAREER_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_CAREER_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_CAREER:
        return {
          ...state,
          data: action.payload,
        };
      case SET_CAREER_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_CAREER_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_CAREER:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_CAREER_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_CAREER_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_CAREER_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_CAREER_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Career;