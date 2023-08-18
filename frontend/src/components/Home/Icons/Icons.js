import React from 'react';
import "./Icons.css";
import icon from "../../../image/1.png"
import icons from "../../../image/2.png"
import iconss from "../../../image/3.png"

const Icons = () => {
    return (
            <div className="contact-footerr">
                <div className="social-linkss">
                    <a href="/" ><img src={icon} alt='' className='icon-imgss' /></a>
                    <a href="/" ><img src={icons} alt='' className='icon-imgss' /></a>
                    <a href="/" ><img src={iconss} alt='' className='icon-imgss' /></a>
                </div>
            </div>

    )
}

export default Icons