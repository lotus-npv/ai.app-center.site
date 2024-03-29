import {
  GET_TICKET_ALL,
  GET_TICKET_ALL_SUCCESS,
  GET_TICKET_ALL_FAIL,

  GET_TICKET_ALLINFO,
  GET_TICKET_ALLINFO_SUCCESS,
  GET_TICKET_ALLINFO_FAIL,

  GET_TICKET_USERID,
  GET_TICKET_USERID_SUCCESS,
  GET_TICKET_USERID_FAIL,

  GET_TICKET_ID,
  GET_TICKET_ID_SUCCESS,
  GET_TICKET_ID_FAIL,

  SET_TICKET,
  SET_TICKET_SUCCESS,
  SET_TICKET_FAIL,

  UPDATE_TICKET,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,

  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    datas: [],
    dataId: null,
    data: null,
    loading: false
  };
  
  const Ticket = (state = INIT_STATE, action) => {
    switch (action.type) {

      case GET_TICKET_ALL:
        return {
          ...state,
          loading: true
        };
      case GET_TICKET_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          datas: action.payload,
        };
      case GET_TICKET_ALL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case GET_TICKET_ALLINFO:
          return {
            ...state,
            loading: true
          };
        case GET_TICKET_ALLINFO_SUCCESS:
          return {
            ...state,
            loading: false,
            datas: action.payload,
          };
        case GET_TICKET_ALLINFO_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

        case GET_TICKET_USERID:
          return {
            ...state,
            loading: true
          };
        case GET_TICKET_USERID_SUCCESS:
          return {
            ...state,
            loading: false,
            datas: action.payload,
          };
        case GET_TICKET_USERID_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

      case GET_TICKET_ID_SUCCESS:
        return {
          ...state,
          dataId: action.payload,
        };
      case GET_TICKET_ID_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_TICKET:
        return {
          ...state,
          loading: true,
        };
      case SET_TICKET_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case SET_TICKET_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_TICKET:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_TICKET_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_TICKET_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_TICKET_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_TICKET_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default Ticket;