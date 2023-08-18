import "./Testimonial.scss";
import React from 'react';
import ReactStar from "react-rating-stars-component";

const Testimonial = ({ testimonial }) => {
    const options = {
        edit: false,
        color: "rgb(152, 152, 152)",
        activeColor: "rgb(255 170 0)",
        size: window.innerWidth < 600 ? 20 : 25,
        value: testimonial.rating,
        isHalf: true,
    }
    return (
        <>
            <div className="Wrapper">
                <div className="Cards">
                    <div className="Card">
                        <ReactStar {...options} />{" "}
                        <p className="Message">
                            {testimonial.comment}
                        </p>

                        {/* <h2 className="Title">Jay Prakash jha</h2> */}
                        <h4 className="Desc">{testimonial.name}</h4>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Testimonial;

