import React from 'react';
import "./About.css"
import aj2 from "../../../image/aj2.jpg"
import MetaData from '../MetaData';

const About = () => {
    return (
        <>

            <MetaData title="About Us || DapperDaddy" />
            <section className='hero'>
                <div className="contact-bg">
                    <h2>About us</h2>
                    <div className="line">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    {/* <p className="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda iste facilis quos impedit fuga nobis modi debitis laboriosam velit reiciendis quisquam alias corporis, maxime enim, optio ab dolorum sequi qui.</p> */}
                </div>

                <div className="container">
                    <div className="hero-content">
                        <h2>Welcome To our Website</h2>
                        <p>Welcome to Dapper Daddy, a skincare company inspired by the bold and vibrant personality of our fathers.
                            Founded in 2019 under the parent company, Grooming Laces, Dapper Daddy believes in the Power of Nature!
                            We believe that self-care should be effortless and enjoyable which encouraged us to create a range of
                            products that are not only effective but also gentle on your skin and hair. That’s how we decided to
                            introduce formulations that harness the power of natural ingredients free from chemicals, sulfates, and parabens.
                            Our mission is to provide you with a safe alternative to the harmful chemicals found in most beauty products.
                            Join the Dapper Daddy family today and discover the art of sophisticated grooming like never before.</p>
                        <button className="cta-button">Read More</button>
                    </div>

                    <div className="hero-image">
                        <img src={aj2} alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default About