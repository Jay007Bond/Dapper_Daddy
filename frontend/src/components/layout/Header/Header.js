import React, { useEffect, useState } from "react";
import Logo from "../../../image/logo.png";
import { FaUser, FaBars } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";

import "./Header.scss";
import Search from "../../Product/Search";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // State variable to control mobile navigation menu
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu((prev) => !prev);
    };

    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
                <div className="header-content">
                    <div className="left">
                        <img src={Logo} alt="" onClick={() => navigate("/")} />
                    </div>



                    <ul className={`center ${showMobileMenu ? "show-mobile-menu" : ""}`}>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/products")}>Shop</li>

                        <li className="nav-item">
                            <a href="#about">About Us</a>
                        </li>

                        <li onClick={() => navigate("/contact")}>Contact Us</li>
                    </ul>



                    <div className="right">
                        <span className="cart-icon">
                            <Search />
                        </span>

                        <span className="cart-icon" onClick={() => navigate("/cart")}>
                            <CgShoppingCart />
                            {!!cartItems.length && <span>{cartItems.length}</span>}
                        </span>

                        <span className="cart-icon">
                            <FaUser onClick={() => navigate("/login")} />
                        </span>

                    </div>


                    <button className="mobile-toggle-btn" onClick={toggleMobileMenu}>
                        <FaBars />
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
