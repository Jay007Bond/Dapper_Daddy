import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch from react-redux
import { addItemsToCart } from "../../actions/cartAction"; // Import the addItemsToCart action
import "./ProductCard.css";
import { useAlert } from 'react-alert';
import { Rating } from '@material-ui/lab';

const ProductsCards = ({ product }) => {
    const dispatch = useDispatch(); // Initialize the dispatch function
    const history = useNavigate();
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

    const redirectToProductDetails = () => {
        history(`/product/${product._id}`); // Programmatically navigate to the product details page
    };


    const options = {
        size: "small",
        value: product?.ratings,
        readOnly: true,
        precision: 0.5,
    }



    return (
        <>
            <div className='productCard'>
                <img src={product.images[0]?.url} alt={product.name} onClick={redirectToProductDetails} />
                <p>{product.name}</p>

                <div>
                    <Rating {...options} />{" "}
                    <span className='productCardSpan'> ({product.numOfReviews} Reviews) </span>
                </div>

                <div className='size'>
                    <span className="selling">&#8377;{product.price}</span>
                    <span className="mrp-price">&#8377;{product.oldprice}</span>
                    <span className="discount-per">{product.discount}%</span>
                </div>

                <div className='axy'>

                    {product.Stock > 0 ? ( // Only render the button if the product is in stock
                        <button onClick={addToCartHandler} className="btn">Add to Cart</button>
                    ) : (
                        <p className="outOfStock">Out of Stock</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductsCards;
