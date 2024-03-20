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
  DELETE_NATION_SUCCESS,
  DELETE_NATION_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {},
    loading: false
  };
  
  const Nation = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_NATION_ALL:
        return {
          ...state,
          datas: action.payload,
          loading: true
        };
      case GET_NATION_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
          loading: false
        };
  
      case GET_NATION_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_NATION_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_NATION_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_NATION:
        return {
          ...state,
          data: action.payload,
        };
      case SET_NATION_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_NATION_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_NATION:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_NATION_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_NATION_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_NATION_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_NATION_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Nation;