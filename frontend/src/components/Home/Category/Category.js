import React, { useEffect } from "react";
import "./Category.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Hair from "../../../image/hair.png";
import Face from "../../../image/face.png";
import Beard from "../../../image/beard.png";
import { useNavigate } from "react-router-dom";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const categories = [
    { name: "Hair", image: Hair },
    { name: "Face", image: Face },
    { name: "Beard", image: Beard },
];

const Category = () => {
    const history = useNavigate();

    const handleCategoryClick = (category) => {
        history(`/category/${category}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="products-containers">
                <Carousel responsive={responsive} infinite={true}>
                    {categories.map((category) => (
                        <div className="cards" key={category.name} onClick={() => handleCategoryClick(category.name)} >
                            <img src={category.image} className="product--images" alt="product images" />
                            <h2>{category.name}</h2>
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default Category;
