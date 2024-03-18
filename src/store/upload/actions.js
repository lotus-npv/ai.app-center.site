import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
} from "./actionTypes";

export const uploadFile = (formData) => ({
  type: UPLOAD_FILE,
  payload: formData
});

export const uploadFileSuccess = filename => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: filename,
});

export const uploadFileFail = error => ({
  type: UPLOAD_FILE_FAIL,
  payload: error,
});

