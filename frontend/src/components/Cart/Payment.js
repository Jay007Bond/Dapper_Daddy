import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router";

const Payment = () => {
  const history = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, discountedPrice } = useSelector((state) => state.applycoupon); // Access discountedPrice from Redux store


  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const paymentData = {
    amount: Math.round(discountedPrice !== null ? discountedPrice * 100 : orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: discountedPrice !== null ? discountedPrice : orderInfo.totalPrice,
    paymentMethod, // Add paymentMethod to the order object
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      // Check if the selected payment method is 'stripe'
      if (paymentMethod === "stripe") {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post("/api/v1/payment/process", paymentData, config);

        if (response && response.data) {
          const client_secret = response.data.client_secret;

          if (!stripe || !elements) return;

          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pinCode,
                  country: shippingInfo.country,
                },
              },
            },
          });

          if (result.error) {
            payBtn.current.disabled = false;
            alert.error(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              order.paymentInfo = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              };
              dispatch(createOrder(order, "stripe"));
              history("/success", { replace: true });
            } else {
              alert.error("There's some issue while processing payment");
            }
          }
        } else {
          alert.error("Failed to process payment. Please try again later.");
        }
      } else if (paymentMethod === "cod") {
        // order.paymentMethod = "Cash on Delivery";
        // If payment is Cash on Delivery, set payment details accordingly
        order.paymentInfo = {
          id: "", // In case of COD, set the id to an empty string
          status: "COD", // Set the status to 'COD' for COD orders
        };
        dispatch(createOrder(order, "cod"));
        history("/success", { replace: true });
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };


  const getButtonText = () => {
    if (paymentMethod === "stripe") {
      return `Pay - ₹${discountedPrice !== null ? discountedPrice : (orderInfo && orderInfo.totalPrice)}`;
    } else if (paymentMethod === "cod") {
      return "Cash on Delivery";
    }
    return "Pay";
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography >Choose Payment Method:</Typography>
          <RadioGroup
            aria-label="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="stripe"
              control={<Radio color="primary" />}
              label="Credit Card"
            />
            <FormControlLabel
              value="cod"
              control={<Radio color="primary" />}
              label="Cash on Delivery (COD)"
            />
          </RadioGroup>
          {paymentMethod === "stripe" ? (
            <>
              <Typography>Card Info</Typography>
              <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>
            </>
          ) : null}

          <input
            type="submit"
            value={getButtonText()}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
