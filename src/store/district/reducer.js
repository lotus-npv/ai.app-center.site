import {
  GET_DISTRICT_ALL,
  GET_DISTRICT_ALL_SUCCESS,
  GET_DISTRICT_ALL_FAIL,
  GET_DISTRICT_ID,
  GET_DISTRICT_ID_SUCCESS,
  GET_DISTRICT_ID_FAIL,
  GET_DISTRICT_BY_PROVINCE_ID,
  GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
  GET_DISTRICT_BY_PROVINCE_ID_FAIL,
  SET_DISTRICT,
  SET_DISTRICT_SUCCESS,
  SET_DISTRICT_FAIL,
  UPDATE_DISTRICT,
  UPDATE_DISTRICT_SUCCESS,
  UPDATE_DISTRICT_FAIL,
  DELETE_DISTRICT_SUCCESS,
  DELETE_DISTRICT_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: null,
    dataByProvinceId: null,
    data: {},
    loading: false
  };
  
  const District = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_DISTRICT_ALL:
        return {
          ...state,
          loading: true,
        };
      case GET_DISTRICT_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
          loading: false
        };
  
      case GET_DISTRICT_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_DISTRICT_ID:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_DISTRICT_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_DISTRICT_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_DISTRICT_BY_PROVINCE_ID:
        return {
          ...state,
          loading: true,
        };
      case GET_DISTRICT_BY_PROVINCE_ID_SUCCESS:
        return {
          ...state,
          dataByProvinceId: action.payload,
          loading: false
        };
      case GET_DISTRICT_BY_PROVINCE_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_DISTRICT:
        return {
          ...state,
          data: action.payload,
        };
      case SET_DISTRICT_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_DISTRICT_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_DISTRICT:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_DISTRICT_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_DISTRICT_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_DISTRICT_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_DISTRICT_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default District;