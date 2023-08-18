import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import imagesss from "../../image/product page banner.png"
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import ProductsCards from "../Home/ProductsCards";


const categories = [
    "Hair",
    "Face",
    "Beard",
];



const Products = () => {
    const match = useParams()
    const dispatch = useDispatch();

    const alert = useAlert()

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    // price
    const [price, setPrice] = useState([0, 2000]);
    // category
    const [category, setCategory] = useState("");
    // rating
    const [ratings, setRatings] = useState(0);



    const { products, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );
    const keyword = match.keyword;

    // pagination
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    };
    // price
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings, alert, error))
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);


    let count = filteredProductsCount;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <MetaData title="All Products || DapperDaddy" />


            <div className="main">
                <img src={imagesss} className='abhishek' alt="" />
            </div>



            <h2 className="productsHeading">Products</h2>

            <div className='Container' id='container' >

                <div className="products">
                    {products && products.map((product) => (
                        <ProductsCards key={product._id} product={product} />
                    ))}
                </div>

            </div>

            {/* filter */}
            <div className="filterBox">


                {/* category */}
                <ul className="categoryBox">
                    <Typography>Category</Typography>
                    {categories.map((category) => (
                        <li
                            className="category-link"
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                {/* price */}
                <Typography>Price</Typography>

                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={2000}
                />

                {/*Rating  */}

                <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                            setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                </fieldset>


            </div>




            {/* pagination */}
            {resultPerPage < count && (
                <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>
            )}




            
        </>

    );
};

export default Products;