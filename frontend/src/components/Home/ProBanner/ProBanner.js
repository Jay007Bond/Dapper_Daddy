import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProBanner.scss";
import img1 from "../../../image/product banner 1.png";
import img2 from "../../../image/product banner 2.png";




const ProBanner = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
    return (
        <>
            <div className="products-containerss">
                <Carousel
                    responsive={responsive}
                    arrows={true}
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    autoPlay={true}
                    infinite={true}
                    autoPlaySpeed={3000}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                >

                    <div className="cardss">
                        <img src={img1} className='product--imagess' alt="product images" />
                    </div>
                    <div className="cardss">
                        <img src={img2} className='product--imagess' alt="product images" />
                    </div>

                </Carousel>
            </div >
        </>
    )
}

export default ProBanner;

