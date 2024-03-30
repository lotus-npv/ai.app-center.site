import {
  GET_KEYLICENSE_ALL,
  GET_KEYLICENSE_ALL_SUCCESS,
  GET_KEYLICENSE_ALL_FAIL,
  GET_KEYLICENSE_ID,
  GET_KEYLICENSE_ID_SUCCESS,
  GET_KEYLICENSE_ID_FAIL,
  SET_KEYLICENSE,
  SET_KEYLICENSE_SUCCESS,
  SET_KEYLICENSE_FAIL,
  UPDATE_KEYLICENSE,
  UPDATE_KEYLICENSE_SUCCESS,
  UPDATE_KEYLICENSE_FAIL,
  DELETE_KEYLICENSE_SUCCESS,
  DELETE_KEYLICENSE_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {},
    loading: false
  };
  
  const KeyLicense = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_KEYLICENSE_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_KEYLICENSE_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
  
      case GET_KEYLICENSE_ALL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GET_KEYLICENSE_ID:
        return {
          ...state,
          loading: true,
        };
      case GET_KEYLICENSE_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case GET_KEYLICENSE_ID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_KEYLICENSE:
        return {
          ...state,
          data: action.payload,
        };
      case SET_KEYLICENSE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_KEYLICENSE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_KEYLICENSE:
        return {
          ...state,
          loading: true,
          data: action.payload,
        };
      case UPDATE_KEYLICENSE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case UPDATE_KEYLICENSE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_KEYLICENSE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_KEYLICENSE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default KeyLicense;