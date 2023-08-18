import {
  NEW_BANNER_REQUEST,
  NEW_BANNER_SUCCESS,
  NEW_BANNER_RESET,
  NEW_BANNER_FAIL,
  GET_ALL_BANNERS_REQUEST,
  GET_ALL_BANNERS_SUCCESS,
  GET_ALL_BANNERS_FAIL,
  GET_BANNER_BY_ID_REQUEST,
  GET_BANNER_BY_ID_SUCCESS,
  GET_BANNER_BY_ID_FAIL,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_RESET,
  UPDATE_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_RESET,
  DELETE_BANNER_FAIL,
  CLEAR_ERRORS,
} from '../constants/bannerConstants';



export const newBannerReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case NEW_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_BANNER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        banner: action.payload.banner,
      };
    case NEW_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_BANNER_RESET:
      return {
        ...state,
        success: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


// get
export const bannerReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case GET_ALL_BANNERS_REQUEST:
      return {
        loading: true,
        banners: [],
      };
    case GET_ALL_BANNERS_SUCCESS:
      return {
        loading: false,
        banners: action.payload,
      };
    case GET_ALL_BANNERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const bannerDetailsReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case GET_BANNER_BY_ID_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_BANNER_BY_ID_SUCCESS:
      return {
        loading: false,
        banner: action.payload,
      };
    case GET_BANNER_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};



export const bannerUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_BANNER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};




export const bannerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BANNER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

