import axios from "axios";

import {
    NEW_BANNER_REQUEST,
    NEW_BANNER_SUCCESS,
    NEW_BANNER_FAIL,
    GET_ALL_BANNERS_REQUEST,
    GET_ALL_BANNERS_SUCCESS,
    GET_ALL_BANNERS_FAIL,
    GET_BANNER_BY_ID_REQUEST,
    GET_BANNER_BY_ID_SUCCESS,
    GET_BANNER_BY_ID_FAIL,
    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_FAIL,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,
    CLEAR_ERRORS,
} from "../constants/bannerConstants";



// Create a new banner
export const createBanner = (bannerData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BANNER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(`/api/v1/admin/banner/new`, bannerData, config);

        dispatch({
            type: NEW_BANNER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_BANNER_FAIL,
            payload: error.response.data.message,
        });
    }
};




// Get banner by ID
export const getBannerById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_BANNER_BY_ID_REQUEST });

        const { data } = await axios.get(`/api/v1/banner/${id}`);

        dispatch({
            type: GET_BANNER_BY_ID_SUCCESS,
            payload: data.banner,
        });
    } catch (error) {
        dispatch({
            type: GET_BANNER_BY_ID_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Get all admin banners  
export const getAllBanners = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_BANNERS_REQUEST });

        const { data } = await axios.get("/api/v1/admin/banners");

        dispatch({
            type: GET_ALL_BANNERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_BANNERS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Update a banner
export const updateBanner = (id, bannerData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BANNER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/admin/banner/${id}`, bannerData, config);

        dispatch({
            type: UPDATE_BANNER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BANNER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Delete a banner
export const deleteBanner = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BANNER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);

        dispatch({
            type: DELETE_BANNER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_BANNER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Clear banner errors
export const clearBannerErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
