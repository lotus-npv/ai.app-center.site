import {
  GET_AVATA_ALL,
  GET_AVATA_ALL_SUCCESS,
  GET_AVATA_ALL_FAIL,
  GET_AVATA_ID,
  GET_AVATA_ID_SUCCESS,
  GET_AVATA_ID_FAIL,
  SET_AVATA,
  SET_AVATA_SUCCESS,
  SET_AVATA_FAIL,
  UPDATE_AVATA,
  UPDATE_AVATA_SUCCESS,
  UPDATE_AVATA_FAIL,
  DELETE_AVATA_SUCCESS,
  DELETE_AVATA_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {}
  };
  
  const Avata = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_AVATA_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_AVATA_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_AVATA_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_AVATA_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_AVATA:
        return {
          ...state,
          data: action.payload,
        };
      case SET_AVATA_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_AVATA_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_AVATA:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_AVATA_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_AVATA_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_AVATA_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_AVATA_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Avata;