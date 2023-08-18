import React, { Fragment, useEffect, useState } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Button, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors, cancelOrder } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { format } from "date-fns";




const OrderDetails = () => {
    const params = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isDelivered, setIsDelivered] = useState(false);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(params.id));
    }, [dispatch, alert, error, params.id]);

    const formatDateAndTime = (datetime) => {
        return format(new Date(datetime), "dd-MM-yyyy hh:mm:ss a");
    };


    const handleCancelOrder = async () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            await dispatch(cancelOrder(params.id));
            await dispatch(getOrderDetails(params.id));
        }
    };


    useEffect(() => {
        setPaymentStatus(order?.paymentInfo?.status);
        setIsDelivered(order?.orderStatus === "Delivered");
    }, [order]);


    const getActiveStep = () => {
        switch (order?.orderStatus) {
            case "Processing":
                return 0;
            case "Shipped":
                return 1;
            case "Delivered":
                return 2;
            default:
                return 0;
        }
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <h2 className='homeHeading'>Order Details</h2>

                            <Typography>OrderID </Typography>
                            <div className="orderDetailsContainerBoxs">
                                <div>
                                    <p> #{order && order._id}</p>
                                    {/* <span>Order #{order && order._id}</span> */}
                                </div>
                            </div>

                            <Typography>Shipping Info</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{order?.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>
                                        {order?.shippingInfo && order.shippingInfo.phoneNo}
                                    </span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>
                                        {order?.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                    </span>
                                </div>
                            </div>
                            {/* Payment */}
                            <Typography>Order Status</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Order Date and Time:</p>
                                    <span>{order?.createdAt && formatDateAndTime(order.createdAt)}</span>
                                </div>
                                <div>
                                    <p>Payment :  </p>
                                    {/* <span className={order?.paymentInfo?.status === "succeeded" ? "greenColor" : "redColor"}>
                                        {order?.paymentInfo?.status === "succeeded" ? "PAID" : "DUE"}
                                    </span> */}
                                    <span className={(paymentStatus === "succeeded" || isDelivered) ? "greenColor" : "redColor"}>
                                        {(paymentStatus === "succeeded" || isDelivered) ? "PAID" : "DUE"}
                                    </span>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>Rs {order?.totalPrice && order.totalPrice}</span>
                                </div>
                                <div>
                                    <p>Order Mode:</p>
                                    <span>{order?.paymentInfo && order.paymentInfo.status === "succeeded"
                                        ? "Paid by Stripe"
                                        : "Cash on Delivery (COD)"}
                                    </span>
                                </div>

                            </div>

                            <div className="orderDetailsContainerBox">
                                {order?.orderStatus === "Processing" && (
                                    <Stepper activeStep={getActiveStep()} alternativeLabel>
                                        <Step>
                                            <StepLabel>Processing</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Shipped</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Delivered</StepLabel>
                                        </Step>
                                    </Stepper>
                                )}

                                {order?.orderStatus === "Shipped" && (
                                    <Stepper activeStep={getActiveStep()} alternativeLabel>
                                        <Step>
                                            <StepLabel>Processing</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Shipped</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Delivered</StepLabel>
                                        </Step>
                                    </Stepper>
                                )}

                                {order?.orderStatus === "Delivered" && (
                                    <Stepper activeStep={getActiveStep()} alternativeLabel>
                                        <Step>
                                            <StepLabel>Processing</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Shipped</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Delivered</StepLabel>
                                        </Step>
                                    </Stepper>
                                )}

                                {order?.orderStatus === "Cancelled" && (
                                    <Typography className="redColor">Your items has been Cancelled Successfully</Typography>
                                )}

                                {order?.orderStatus === "Delivered" && (
                                    <Typography className="greenColor">Thank You! Your items has been Delivered Successfully ✅🤩</Typography>
                                )}


                                {/* Show the "Cancel Order" button for orders with "Processing" status */}
                                {order?.orderStatus === 'Processing' && (
                                    <div className="cancelOrderButtonContainer">
                                        <Button variant="outlined" color="secondary" onClick={handleCancelOrder}>
                                            Cancel Order
                                        </Button>
                                    </div>
                                )}

                                {order?.orderStatus === 'Processing' && (
                                    <p className="disclamair" style={{ padding: "2px" }}><b>Disclaimer:</b> Please note that once an order has been placed, it may not be possible to cancel it. However, we will make every effort to accommodate your request if the order has not yet been processed or shipped.</p>
                                )}

                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <Typography>Order Items:</Typography>
                            <div className="orderDetailsCartItemsContainer">
                                {order?.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X ₹{item.price} ={" "}
                                                <b>₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment >
    );
};

export default OrderDetails;