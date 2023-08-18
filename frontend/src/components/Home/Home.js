import React, { Fragment, useEffect } from "react";
// import { slidesData } from "../../data/slidesData.js";
import Banner from "./Banner/Banner.js";
import Icons from "./Icons/Icons.js";
import HomeProduct from "./HomeProduct/HomeProduct.js";
import "./Home.scss"
import AboutUs from "./AboutUs/AboutUs.js";
import Category from "./Category/Category.js";
import ProBanner from "./ProBanner/ProBanner.js";
import Testimonials from "./Testimonials/Testimonials.js";
import MetaData from "../layout/MetaData.js";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import { getAllBanners } from "../../actions/bannerAction.js";





const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products);

  const { banners } = useSelector(state => state.banners)


  useEffect(() => {

    if (error) {
      return alert.error(error)
    }
    dispatch(getProduct());
    dispatch(getAllBanners())
  }, [dispatch, error, alert]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>

      {loading ? (<Loader />) : (
        <Fragment>
          <MetaData title="DapperDaddy || Home - Men's Grooming Essentials" />



          {/* banner components */}
          <Banner banners={banners} />

          {/* icons components */}
          <Icons />


          {/* product components */}
          <h2 className='homeHeading'>Featured Products</h2>
          <HomeProduct products={products} />


          {/* about us components */}
          <AboutUs />

          {/* Category components */}
          <h2 className='homeHeading'>Category</h2>
          <Category />

          {/* product Banner */}
          <ProBanner />

          {/* Testimonials */}
          <h2 className='homeHeading'>Testimonials</h2>
          <Testimonials products={products} />


        </Fragment>
      )
      }
    </Fragment >

  )
}

export default Home;