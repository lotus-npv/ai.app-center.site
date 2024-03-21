import {
  GET_EMPLOYEE_ALL,
  GET_EMPLOYEE_ALL_SUCCESS,
  GET_EMPLOYEE_ALL_FAIL,
  GET_EMPLOYEE_ID,
  GET_EMPLOYEE_ID_SUCCESS,
  GET_EMPLOYEE_ID_FAIL,
  SET_EMPLOYEE,
  SET_EMPLOYEE_SUCCESS,
  SET_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: [],
    data: {},
    loading: false
  };
  
  const Employee = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_EMPLOYEE_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_EMPLOYEE_ALL_SUCCESS:
        return {
          ...state,
          datas: action.payload,
          loading: false
        };
  
      case GET_EMPLOYEE_ALL_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_EMPLOYEE_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_EMPLOYEE_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_EMPLOYEE:
        return {
          ...state,
          data: action.payload,
        };
      case SET_EMPLOYEE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
  
      case SET_EMPLOYEE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_EMPLOYEE:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_EMPLOYEE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_EMPLOYEE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Employee;