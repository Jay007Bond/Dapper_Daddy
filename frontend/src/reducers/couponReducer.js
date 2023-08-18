import {
    COUPON_CREATE_REQUEST,
    COUPON_CREATE_SUCCESS,
    COUPON_CREATE_RESET,
    COUPON_CREATE_FAIL,
    COUPON_DELETE_REQUEST,
    COUPON_DELETE_SUCCESS,
    COUPON_DELETE_RESET,
    COUPON_DELETE_FAIL,
    COUPON_GET_ALL_REQUEST,
    COUPON_GET_ALL_SUCCESS,
    COUPON_GET_ALL_FAIL,
    APPLY_COUPON_REQUEST,
    APPLY_COUPON_SUCCESS,
    APPLY_COUPON_FAILURE,
    CLEAR_ERRORS
} from '../constants/couponConstants';

const initialState = {
    loading: false,
    error: null,
    success: false,
    appliedCoupon: null,
    discountedPrice: null,
};


// FETCH AND APPLY
export const couponReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_COUPON_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case APPLY_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                appliedCoupon: action.payload.appliedCoupon,
                discountedPrice: action.payload.discountedPrice,
            };
        case APPLY_COUPON_FAILURE:
            return {
                ...state,
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



// get coupon
export const couponGetAllReducer = (state = { coupons: [] }, action) => {
    switch (action.type) {
        case COUPON_GET_ALL_REQUEST:
            return {
                loading: true,
                coupons: [],
            };
        case COUPON_GET_ALL_SUCCESS:
            return {
                loading: false,
                coupons: action.payload,
            };
        case COUPON_GET_ALL_FAIL:
            return {
                loading: false,
                error: action.payload
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



// create
export const couponCreateReducer = (state = { savedCoupon: {} }, action) => {
    switch (action.type) {
        case COUPON_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COUPON_CREATE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                savedCoupon: action.payload.savedCoupon,
            };
        case COUPON_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case COUPON_CREATE_RESET:
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





// delete
export const couponDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case COUPON_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case COUPON_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case COUPON_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case COUPON_DELETE_RESET:
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







