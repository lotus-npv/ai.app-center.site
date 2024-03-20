import {
  GET_VIOLATETYPE_ALL,
  GET_VIOLATETYPE_ALL_SUCCESS,
  GET_VIOLATETYPE_ALL_FAIL,
  GET_VIOLATETYPE_ID,
  GET_VIOLATETYPE_ID_SUCCESS,
  GET_VIOLATETYPE_ID_FAIL,
  SET_VIOLATETYPE,
  SET_VIOLATETYPE_SUCCESS,
  SET_VIOLATETYPE_FAIL,
  UPDATE_VIOLATETYPE,
  UPDATE_VIOLATETYPE_SUCCESS,
  UPDATE_VIOLATETYPE_FAIL,
  DELETE_VIOLATETYPE_SUCCESS,
  DELETE_VIOLATETYPE_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {}
  };
  
  const ViolateType = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_VIOLATETYPE_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
        };
  
      case GET_VIOLATETYPE_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_VIOLATETYPE_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_VIOLATETYPE_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_VIOLATETYPE:
        return {
          ...state,
          data: action.payload,
        };
      case SET_VIOLATETYPE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_VIOLATETYPE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_VIOLATETYPE:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_VIOLATETYPE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_VIOLATETYPE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_VIOLATETYPE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_VIOLATETYPE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default ViolateType;