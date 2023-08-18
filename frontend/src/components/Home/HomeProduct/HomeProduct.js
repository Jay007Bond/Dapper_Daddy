import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import HomesProducts from "./HomesProducts/HomesProducts"


const HomeProduct = ({ products = [] }) => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <div className="products-container">
                <Carousel responsive={responsive} infinite={true}>

                    {products && products.map(product => (
                        <HomesProducts key={product._id} product={product} />
                    ))}

                </Carousel>
            </div >
        </>
    )
}

export default HomeProduct;

