import React, { Fragment, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { applyCoupon, clearCouponError } from "../../actions/couponAction";
import { APPLY_COUPON_SUCCESS } from "../../constants/couponConstants";



const ConfirmOrder = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const { error, discountedPrice } = useSelector((state) => state.applycoupon)

    const [couponCode, setCouponCode] = useState("");

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 0 ? 0 : 0;

    const tax = subtotal * 0;

    const totalPrice = subtotal + tax + shippingCharges;

    const totalPriceWithDiscount =
        discountedPrice !== null ? discountedPrice : totalPrice; // Use discountedPrice if available, otherwise use regular totalPrice

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history("/process/payment");
    };
    const handleApplyCoupon = () => {
        // Dispatch the applyCoupon action with the coupon code and total price
        dispatch(applyCoupon(couponCode, totalPrice));
    };

    const clearCouponErrorMessage = () => {
        dispatch(clearCouponError());
        dispatch({ type: APPLY_COUPON_SUCCESS, payload: { discountedPrice: null } });
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user?.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
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
                {/*  */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p className="ajp">Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p className="ajp">Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            {/* <div>
                                <p className="ajp">GST:</p>
                                <span>₹{tax}</span>
                            </div> */}

                            {/* coupon section  */}
                            <div className="couponSection">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />


                                <button onClick={handleApplyCoupon} className="check-btn">Apply Coupon</button>

                            </div>

                            {error && (
                                <p className="coupon-error-message">
                                    {error}
                                    <button onClick={clearCouponErrorMessage} className="cross">&times;</button>
                                </p>
                            )}
                            {discountedPrice && !error && (
                                <p className="coupon-success-message">
                                    Coupon applied successfully! Discount: ₹{totalPrice - discountedPrice}
                                    <button onClick={clearCouponErrorMessage} className="cross">&times;</button>
                                </p>
                            )}


                            <div className="orderSummaryTotal">
                                <p className="ajp">
                                    <b>Total:</b>
                                </p>
                                <span>₹{totalPriceWithDiscount}</span>
                            </div>



                        </div>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;