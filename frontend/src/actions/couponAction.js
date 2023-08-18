import axios from 'axios';
import {
    COUPON_CREATE_REQUEST,
    COUPON_CREATE_SUCCESS,
    COUPON_CREATE_FAIL,
    COUPON_GET_ALL_REQUEST,
    COUPON_GET_ALL_SUCCESS,
    COUPON_GET_ALL_FAIL,
    APPLY_COUPON_REQUEST,
    APPLY_COUPON_SUCCESS,
    APPLY_COUPON_FAILURE,
    COUPON_DELETE_REQUEST,
    COUPON_DELETE_SUCCESS,
    COUPON_DELETE_FAIL,
    CLEAR_ERRORS,
} from '../constants/couponConstants';



// Action to create a new coupon
export const createCoupon = (couponData) => async (dispatch) => {
    try {
        dispatch({ type: COUPON_CREATE_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };


        const { data } = await axios.post('/api/v1/admin/coupon/new', couponData, config);

        dispatch({
            type: COUPON_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COUPON_CREATE_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Action to get all coupons
export const getAllCoupons = () => async (dispatch) => {
    try {
        dispatch({ type: COUPON_GET_ALL_REQUEST });

        const { data } = await axios.get('/api/v1/coupons');

        dispatch({
            type: COUPON_GET_ALL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: COUPON_GET_ALL_FAIL,
            payload: error.response.data.message,
        });
    }
};





// Apply a coupon to the order
export const applyCoupon = (couponCode, totalPrice) => {
    return async (dispatch) => {
        try {
            dispatch({ type: APPLY_COUPON_REQUEST });

            // Make an API call to apply the coupon using Axios
            const { data } = await axios.post('/api/v1/applycoupon', {
                couponCode,
                totalPrice,
            });

            dispatch({
                type: APPLY_COUPON_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: APPLY_COUPON_FAILURE,
                payload:
                    error.response && error.response.status === 404
                        ? 'Coupon code is not valid'
                        : error.message || 'Server error',
            });
        }
    };
};



// Action to delete a coupon
export const deleteCoupon = (id) => async (dispatch) => {
    try {
        dispatch({ type: COUPON_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/coupon/${id}`);

        dispatch({
            type: COUPON_DELETE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: COUPON_DELETE_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Clearing Errors
export const clearCouponError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
