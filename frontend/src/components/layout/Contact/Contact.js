import React from 'react'
import "./Contact.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import MetaData from "../MetaData";

const Contact = () => {
    return (
        <>
            <MetaData title="Contact Us || DapperDaddy" />
            <section className="contact-section">
                <div className="contact-bg">
                    <h3>Get in Touch with Us</h3>
                    <div className="line">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    {/* <p className="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda iste facilis quos impedit fuga nobis modi debitis laboriosam velit reiciendis quisquam alias corporis, maxime enim, optio ab dolorum sequi qui.</p> */}
                </div>

                <div className="contact-footer">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="https://www.facebook.com/people/The-Dapper-Daddy/100091902366648/" className="fab"><FaFacebookF size={20} /></a>
                        <a href="https://www.instagram.com/dapperdaddy_official/" className="fab1"><FaInstagram size={20} /></a>
                        {/* <a href="/" className="fab2"><FaWhatsapp size={20} /></a> */}

                    </div>
                </div>
                <br></br>
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.860745710949!2d72.61524688763058!3d25.342453468104285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394300ca30470e09%3A0xcb47da337aa7c434!2supar%20kota%20masjid!5e0!3m2!1sen!2sin!4v1688062469303!5m2!1sen!2sin" width="100%" height="600" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='map'></iframe>
                </div>


                <div className="contact-body">
                    <div className="contact-info">
                        <div>
                            <span className='vv1'><FaMobileAlt /></span>
                            <span>Phone No.</span>
                            <span className="text">+91- 7300202769</span>
                        </div>
                        <div>
                            <span className='vv2'><FaEnvelope /></span>
                            <span>E-mail</span>
                            <span className="text">info@thedapperdaddy.com</span>
                        </div>
                        <div>
                            <span className='vv3'><FaLocationArrow /></span>
                            <span>Address</span>
                            <span className="text">Uper Kota, Sayyedo Ki Masjid Ke Saamne, Jalore, Rajasthan 343001</span>
                        </div>
                    </div>



                    {/* <div className="contact-form">
                        <div>
                            <img src={contactImg} alt="" />
                        </div>
                        <form>
                            <div>
                                <input type="text" className="form-control" placeholder="First Name" />
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                            <div>
                                <input type="email" className="form-control" placeholder="E-mail" />
                                <input type="text" className="form-control" placeholder="Phone" />
                            </div>
                            <textarea rows="5" placeholder="Message" className="form-control"></textarea>
                            <input type="submit" className="send-btn" value="send message" />
                        </form>


                    </div> */}
                </div>


            </section>
        </>
    )
}

export default Contact