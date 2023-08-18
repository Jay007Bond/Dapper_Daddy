import React, { Fragment, useEffect, useState } from 'react';
import './cate.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';

import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';
import imagess from "../../image/catagory page banner.png"
import { useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import ProductsCards from '../Home/ProductsCards';



// const categories = ['Hair', 'Face', 'Beard'];

const CategoryProducts = () => {
    const match = useParams();
    const dispatch = useDispatch();

    const alert = useAlert();
    const { category } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 2000]);
    // const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const { products, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );

    const keyword = match.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings, alert, error));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    let count = filteredProductsCount;


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Fragment>

            <MetaData title={` ${category} Products || DapperDaddy`} />


            <div className="main">
                <img src={imagess} className='abhishek' alt="" />
            </div>


            <h2 className="productsHeading">{category}</h2>
            <div className="Container" id="container">
                <div className="products">
                    {products &&
                        products.map((product, id) => <ProductsCards key={product.id} product={product} />)}
                </div>
            </div>

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={2000}
                />

                {/* <ul className="categoryBox">
                            <Typography>Category</Typography>
                            {categories.map((category) => (
                                <li className="category-link" key={category} onClick={() => setCategory(category)}>
                                    {category}
                                </li>
                            ))}
                        </ul> */}

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
        </Fragment>
    );
};

export default CategoryProducts;
