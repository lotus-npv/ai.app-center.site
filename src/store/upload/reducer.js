import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  uploading: false,
  uploadedFilename: null,
  error: null,
};

const UploadFile = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        uploading: true,
        error: null,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploadedFilename: action.payload,
        error: null,
      };

    case UPLOAD_FILE_FAIL:
      return {
        ...state,
        uploading: false,
        uploadedFilename: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UploadFile;