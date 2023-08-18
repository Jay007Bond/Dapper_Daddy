import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_RESET,
    ORDER_APPLY_COUPON,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL,
    PLACE_ORDER_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/orderConstants";



export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PLACE_ORDER_SUCCESS:
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            };

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CREATE_ORDER_RESET:
            return {};
        case ORDER_APPLY_COUPON:
            const { couponDiscount, totalPrice } = action.payload;

            // Calculate the new discounted price
            const discountedPrice = Math.max(totalPrice - couponDiscount, 0);

            return {
                ...state,
                order: {
                    ...state.order,
                    totalPrice: discountedPrice,
                    couponDiscount, // Store the coupon discount in the state
                },
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



export const cancelOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_ORDER_REQUEST:
            return {
                loading: true,
            };
        case CANCEL_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case CANCEL_ORDER_FAIL:
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




export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
            };

        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case MY_ORDERS_FAIL:
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                loading: true,
            };

        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount,
            };

        case ALL_ORDERS_FAIL:
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

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {

                loading: true,
            };

        case UPDATE_ORDER_SUCCESS:
            return {

                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_ORDER_SUCCESS:
            return {

                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {

                loading: false,
                error: action.payload,
            };
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_ORDER_RESET:
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };

        case ORDER_DETAILS_FAIL:
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