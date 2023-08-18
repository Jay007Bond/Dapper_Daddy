import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../actions/cartAction";

const OrderSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch the clearCart action when the component mounts
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Your Order has been Placed successfully</Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;
