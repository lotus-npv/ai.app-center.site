import { UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE } from './actions';

const initialState = {
  uploading: false,
  uploadedFilename: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        uploading: true,
        error: null,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploadedFilename: action.payload,
        error: null,
      };
    case UPLOAD_IMAGE_FAILURE:
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

export default reducer;
