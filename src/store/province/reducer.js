import {
  GET_PROVINCE_ALL,
  GET_PROVINCE_ALL_SUCCESS,
  GET_PROVINCE_ALL_FAIL,
  GET_PROVINCE_ID,
  GET_PROVINCE_ID_SUCCESS,
  GET_PROVINCE_ID_FAIL,
  SET_PROVINCE,
  SET_PROVINCE_SUCCESS,
  SET_PROVINCE_FAIL,
  UPDATE_PROVINCE,
  UPDATE_PROVINCE_SUCCESS,
  UPDATE_PROVINCE_FAIL,
  DELETE_PROVINCE_SUCCESS,
  DELETE_PROVINCE_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {},
    loading: false
  };
  
  const Province = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_PROVINCE_ALL:
        return {
          ...state,
          loading: true,
        };
      case GET_PROVINCE_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
          loading: false
        };
  
      case GET_PROVINCE_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_PROVINCE_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_PROVINCE_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_PROVINCE:
        return {
          ...state,
          data: action.payload,
        };
      case SET_PROVINCE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_PROVINCE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_PROVINCE:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_PROVINCE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_PROVINCE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_PROVINCE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_PROVINCE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Province;