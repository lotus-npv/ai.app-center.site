import {
  GET_INTERN_ALL,
  GET_INTERN_ALL_SUCCESS,
  GET_INTERN_ALL_FAIL,
  GET_INTERN_ALLINFO,
  GET_INTERN_ALLINFO_SUCCESS,
  GET_INTERN_ALLINFO_FAIL,
  GET_INTERN_ID_SUCCESS,
  GET_INTERN_ID_FAIL,
  SET_INTERN,
  SET_INTERN_SUCCESS,
  SET_INTERN_FAIL,
  UPDATE_INTERN,
  UPDATE_INTERN_SUCCESS,
  UPDATE_INTERN_FAIL,
  DELETE_INTERN_SUCCESS,
  DELETE_INTERN_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    data: {}
  };
  
  const Intern = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_INTERN_ALL:
        return {
          ...state,
        };
      case GET_INTERN_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_INTERN_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_INTERN_ALLINFO:
        return {
          ...state,
        };
      case GET_INTERN_ALLINFO_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_INTERN_ALLINFO_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_INTERN:
        return {
          ...state,
          data: action.payload,
        };
      case SET_INTERN_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_INTERN_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_INTERN:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_INTERN_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_INTERN_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_INTERN_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_INTERN_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Intern;