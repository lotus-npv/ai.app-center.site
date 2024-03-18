export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

export const uploadImageRequest = (formData) => ({
  type: UPLOAD_IMAGE_REQUEST,
  payload: formData,
});

export const uploadImageSuccess = (filename) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: filename,
});

export const uploadImageFailure = (error) => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: error,
});