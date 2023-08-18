import React, { Fragment, useEffect, useState } from 'react'
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Loader from "../layout/Loader/Loader.js";
import MetaData from '../layout/MetaData';
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import delivery from "../../image/delivery-truck.png";
import chemical from "../../image/chemical.png";
import sulphate from "../../image/sls-free.png";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';



const ProductDetails = () => {
    const [selectedImg, setSelectedImg] = useState('');
    const alert = useAlert();
    const params = useParams();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );
    // Access the cart state using useSelector
    const cart = useSelector(state => state.cart);


    const [quantity, setQuantity] = useState(1);

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty)
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty)
    }


    const addToCartHandler = () => {
        const isProductInCart = cart.cartItems.some(item => item.product === product._id);
        if (isProductInCart) {
            alert.info("Item is already in the cart");
        } else {
            dispatch(addItemsToCart(id, quantity));
            alert.success("Item Added To Cart");
        }
    }

    // submit
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };






    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success]);


    useEffect(() => {
        if (product?.images?.length > 0) {
            setSelectedImg(product.images[0].url);
        }
    }, [product]);



    const options = {
        size: "small",
        value: product?.ratings,
        readOnly: true,
        precision: 0.5,
    }
    // color: "#d1cecb",
    // activeColor: "#ffa31b",
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>

                    <MetaData title={`${product?.name} || DapperDaddy`} />
                    <div className="ProductDetails">

                        <div className="left">
                            <div className="images">
                                {product?.images && product?.images?.map((item, i) => (
                                    <img key={item.id} src={item.url} alt="" onClick={(e) => setSelectedImg(item.url)} />
                                ))}
                            </div>
                            <div className="mainImg">
                                <img src={selectedImg} alt="" />
                            </div>
                        </div>



                        {/* {product?.images && product?.images?.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))} */}



                        <div className='right'>

                            <div className="detailsBlock-1">
                                <h3 className='namesw'>{product?.name}</h3>
                                {/* <p>Product # {product?._id}</p> */}
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className='detailsBlock-2-span'>({product?.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                {/* <h1>{`₹${product?.price}`}</h1> */}
                                <div className='detailsPrice'>
                                    <span className="mrp-price"> &#8377;{product?.oldprice}</span>
                                    <span className="discount-per">{product?.discount}% OFF
                                        <span className="selling">&#8377;{product?.price}</span>
                                    </span>

                                </div>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>

                                    {product?.Stock < 1 ? (
                                        <button disabled={true} style={{ cursor: 'not-allowed', backgroundColor: "red" }}>
                                            Out of Stock
                                        </button>
                                    ) : (
                                        <button onClick={addToCartHandler}>
                                            Add to Cart
                                        </button>
                                    )}
                                </div>

                                {/* icon */}
                                <div className="product-data-warranty">
                                    <div className="product-warranty-data">
                                        <img src={delivery} className="warranty-icon" alt='' />
                                        <p>Free Delivery</p>
                                    </div>
                                    <div className="product-warranty-data">
                                        <img src={chemical} className="warranty-icon" alt='' />
                                        <p>Paraben Free</p>
                                    </div>
                                    <div className="product-warranty-data">
                                        <img src={sulphate} className="warranty-icon" alt='' />
                                        <p>Sulphate Free</p>
                                    </div>
                                </div>


                                {/* <p>
                                    Status: {" "}
                                    <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product?.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p> */}

                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product?.description}</p>
                            </div>

                            {/* <button onClick={submitReviewToggle} className='submitReview'>Write a Review</button> */}
                        </div>

                    </div>




                    <h3 className="reviewsHeading">From The Manufacturer</h3>

                    <div className="hero-banner">
                        {product?.banners && product?.banners?.map((item, i) => (
                            <div className="banner-container" key={item.urls}>

                                <div className="first-hero-image">
                                    <img src={item.url} alt="" />
                                </div>

                            </div>
                        ))}

                        <div className="banner-container">
                            {product?.banner && product?.banner?.map((item, i) => (
                                <div className="first-hero-image">
                                    <img key={item.urls} src={item.url} alt='' />
                                </div>
                            ))}
                        </div>
                    </div>


                    <h3 className="reviewsHeading">Customer Reviews</h3>
                    <div className="rev-header">
                        <div className="left-rev">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="smaller"
                            />
                        </div>
                        <div className="right-rev">
                            <button onClick={submitReviewToggle} className='submitReviews'>Write a Review </button>
                        </div>
                    </div>


                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {
                        product?.reviews && product?.reviews[0] ? (
                            <div className="reviews">
                                {product?.reviews && product?.reviews?.map((review) =>
                                    <ReviewCard key={review} review={review} />
                                )}
                            </div>
                        ) : (
                            <div className="noReviews">No Reviews Yet</div>
                        )
                    }


                    {/* <div className="products-iconss">
                        <div className="social-linkss">
                            <a href="/" ><img src={icon} alt='' className='icon-img' /></a>
                            <a href="/" ><img src={icons} alt='' className='icon-img' /></a>
                            <a href="/" ><img src={iconss} alt='' className='icon-img' /></a>
                        </div>
                    </div> */}


                </Fragment >
            )}
        </Fragment>
    )
}

export default ProductDetails