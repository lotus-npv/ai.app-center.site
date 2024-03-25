import {
  GET_COMMUNE_ALL,
  GET_COMMUNE_ALL_SUCCESS,
  GET_COMMUNE_ALL_FAIL,
  GET_COMMUNE_ID,
  GET_COMMUNE_ID_SUCCESS,
  GET_COMMUNE_ID_FAIL,
  GET_COMMUNE_BY_DISTRICT_ID,
  GET_COMMUNE_BY_DISTRICT_ID_SUCCESS,
  GET_COMMUNE_BY_DISTRICT_ID_FAIL,
  SET_COMMUNE,
  SET_COMMUNE_SUCCESS,
  SET_COMMUNE_FAIL,
  UPDATE_COMMUNE,
  UPDATE_COMMUNE_SUCCESS,
  UPDATE_COMMUNE_FAIL,
  DELETE_COMMUNE_SUCCESS,
  DELETE_COMMUNE_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: null,
    dataByDistrictId: null,
    data: {},
    loading: false
  };
  
  const Commune = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_COMMUNE_ALL:
        return {
          ...state,
          loading: true,
        };
      case GET_COMMUNE_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
          loading: false
        };
  
      case GET_COMMUNE_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_COMMUNE_ID:
        return {
          ...state,
          loading: true,
        };
      case GET_COMMUNE_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          dataId: action.payload,
        };
      case GET_COMMUNE_ID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GET_COMMUNE_BY_DISTRICT_ID:
        return {
          ...state,
          loading: true,
        };
      case GET_COMMUNE_BY_DISTRICT_ID_SUCCESS:
        return {
          ...state,
          dataByDistrictId: action.payload,
          loading: false
        };
      case GET_COMMUNE_BY_DISTRICT_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_COMMUNE:
        return {
          ...state,
          data: action.payload,
        };
      case SET_COMMUNE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_COMMUNE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_COMMUNE:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_COMMUNE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_COMMUNE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_COMMUNE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_COMMUNE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Commune;