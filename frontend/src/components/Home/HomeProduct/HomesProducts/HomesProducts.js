import "./HomesProducts.scss";
import React from 'react';
import ReactStar from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector from react-redux
import { addItemsToCart } from "../../../../actions/cartAction";
import { useAlert } from 'react-alert';

const HomesProducts = ({ product }) => {
    const dispatch = useDispatch();
    const alert = useAlert();


    // Access the cart state using useSelector
    const cart = useSelector(state => state.cart);

    const addToCartHandler = () => {
        // Check if the product is already in the cart
        const isProductInCart = cart.cartItems.some(item => item.product === product._id);

        if (isProductInCart) {
            alert.info("Item is already in the cart");
        } else {
            dispatch(addItemsToCart(product._id, 1));
            alert.success("Item Added To Cart");
        }
    };

    const options = {
        edit: false,
        color: "#989898",
        activeColor: "#e19e0b",
        size: window.innerWidth < 600 ? 20 : 20,
        value: product.ratings,
        isHalf: true,
    };

    return (
        <>
            <div className="card">
                <Link to={`/product/${product._id}`} className="product--image">
                    <img src={product.images[0]?.url} alt={product.name} />
                </Link>
                <div className="prod-details">
                    <div className="prod-name">{product.name} </div>
                    <div className="revi">
                        <ReactStar {...options} />{" "}
                        <span className="users"> ({product.numOfReviews} Reviews) </span>
                    </div>
                    <span className="selling">&#8377;{product.price}</span>
                    <span className="mrp-price">&#8377;{product.oldprice}</span>
                    <span className="discount-per">{product.discount}%</span>
                    <div>
                        {product.Stock > 0 ? ( // Only render the button if the product is in stock
                            <button onClick={addToCartHandler} className="btn">Add to Cart</button>
                        ) : (
                            <button className="btn" style={{ backgroundColor: "white", color: "red", font: "400 1.2vmax Roboto" }}>Out of Stock</button>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default HomesProducts;
