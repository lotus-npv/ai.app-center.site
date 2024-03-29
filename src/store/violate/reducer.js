import {
  GET_VIOLATE_ALL,
  GET_VIOLATE_ALL_SUCCESS,
  GET_VIOLATE_ALL_FAIL,
  GET_VIOLATE_USERID,
  GET_VIOLATE_USERID_SUCCESS,
  GET_VIOLATE_USERID_FAIL,
  GET_VIOLATE_ID,
  GET_VIOLATE_ID_SUCCESS,
  GET_VIOLATE_ID_FAIL,
  SET_VIOLATE,
  SET_VIOLATE_SUCCESS,
  SET_VIOLATE_FAIL,
  UPDATE_VIOLATE,
  UPDATE_VIOLATE_SUCCESS,
  UPDATE_VIOLATE_FAIL,
  DELETE_VIOLATE_SUCCESS,
  DELETE_VIOLATE_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {}
  };
  
  const Violate = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_VIOLATE_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_VIOLATE_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_VIOLATE_USERID_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_VIOLATE_USERID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_VIOLATE_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_VIOLATE_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_VIOLATE:
        return {
          ...state,
          data: action.payload,
        };
      case SET_VIOLATE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_VIOLATE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_VIOLATE:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_VIOLATE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_VIOLATE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_VIOLATE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_VIOLATE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Violate;