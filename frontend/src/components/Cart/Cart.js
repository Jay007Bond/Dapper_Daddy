import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty < 1) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const isOutOfStock = cartItems.some((item) => item.stock === 0 || item.stock < item.quantity);

    const checkoutHandler = () => {
        if (isOutOfStock) {
            // Show window alert or error message for out-of-stock items
            window.alert("Some items are out of stock. Please remove them from your cart before proceeding.");
        } else {
            // Proceed to the next page (e.g., shipping page)
            navigate('/login?redirect=shipping');
        }
    };

    return (
        <Fragment>
            <MetaData title="Cart & CheckOut " />
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartInput">
                                    <button
                                        onClick={() => decreaseQuantity(item.product, item.quantity)}
                                    >
                                        -
                                    </button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button
                                        onClick={() =>
                                            increaseQuantity(item.product, item.quantity, item.stock)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p className="abhi-para1">Gross Total</p>
                                <p className="abhi-para">{`₹${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler} disabled={isOutOfStock}>
                                    {isOutOfStock ? "Out of Stock" : "Check Out"}
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
