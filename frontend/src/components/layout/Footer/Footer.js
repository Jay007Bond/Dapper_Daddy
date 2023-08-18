import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../../image/payments.png";
import Payments from "../../../image/upi-logo-png-4.png"
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

const Footer = () => {

    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    return (
        <footer className="footer">

            <div className="footer-content">
                <div className="col">
                    <div className="title"> FOLLOW US </div>
                    <div className="text1">
                        <div className="social-media">
                            <a href="https://www.facebook.com/people/The-Dapper-Daddy/100091902366648/" target="_blank" rel="noopener noreferrer">
                                <div className="icon">
                                    <FaFacebookF size={20} />
                                </div>
                            </a>
                            <a href="https://www.instagram.com/dapperdaddy_official/" target="_blank" rel="noopener noreferrer">
                                <div className="icon v3">
                                    <FaInstagram size={20} />
                                </div>
                            </a>
                            {/* <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
                                <div className="icon v4">
                                    <FaWhatsapp size={20} />
                                </div>
                            </a> */}
                        </div>

                    </div>
                </div>

                {/* contact */}
                <div className="col">
                    <div className="title"> CONTACT US </div>

                    <div className="c-item v1">
                        <FaEnvelope />
                        <div className="text1"> info@thedapperdaddy.com</div>
                    </div>

                    <div className="c-item v2">
                        <FaLocationArrow />
                        <div className="text1"> Uper Kota, Sayyedo Ki Masjid Ke Saamne, Jalore, Rajasthan 343001 </div>
                    </div>

                    <div className="c-item v3">
                        <FaMobileAlt />
                        <div className="text1"> +91- 7300202769</div>
                    </div>

                </div>

                {/* About */}
                <div className="col">
                    <div className="title">
                        T & C POLICY
                    </div>
                    <div className="text1">
                        I Have Been Using Dapper Daddy's Products
                        For a Few Months, And The Results Blow Me Away.
                        My Skin Feels Healthier, More Vibrant, And
                        Incredibly Soft. Knowing That These Products Are
                        Free From Sulfates, Parab.
                    </div>
                </div>


            </div>

            <div className="bottom-bar">
                <div className="bottom-bar-content">
                    <div className="text">
                        © {currentYear} Developed by AbhiJay Solution. All rights reserved.
                    </div>
                    <img src={Payment} alt="" />
                </div>
            </div>

        </footer>
    )
};

export default Footer;
