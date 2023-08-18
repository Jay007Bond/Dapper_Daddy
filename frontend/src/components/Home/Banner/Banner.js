import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Banner.css'; // Import the CSS file for Banner component

const Image = ({ src }) => (
    <img src={src} alt="banner" style={{ width: '100%', height: '100%' }} />
);

const Banner = ({ banners = [] }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <Fragment>
            <Carousel
                responsive={responsive}
                arrows={true}
                swipeable={false}
                draggable={false}
                showDots={true}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={4000}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >
                {banners &&
                    banners.map((data) => (
                        <div key={data} className="banner-item-container">
                            <Link to={`/products`}>
                                <Image src={data?.images[0]?.url} />
                                <h2 className="shop-heading">Shop Now</h2>
                            </Link>
                        </div>
                    ))}
            </Carousel>
        </Fragment>
    );
};

export default Banner;
