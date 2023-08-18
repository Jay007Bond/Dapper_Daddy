import React, { useEffect, useState } from 'react';
import "./index.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js"
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search.js';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import UserOptions from './components/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList.js';
import BannerList from './components/admin/BannerList.js';
import UpdateBanner from './components/admin/UpdateBanner.js';
import NewBanner from './components/admin/NewBanner.js';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct.js';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList.js';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews.js';
import { loadUser } from './actions/userAction';

import axios from 'axios';
// import NotFound from './components/layout/Not Found/NotFound';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NewCoupon from './components/admin/NewCoupon';
// import UpdateCoupon from './components/admin/UpdateCoupon';
import CategoryProduct from './components/Category/CategoryProduct';
import CouponList from './components/admin/CouponList';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
      // Handle the error gracefully, e.g., display an error message to the user.
    }
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    })

    store.dispatch(loadUser())

    getStripeApiKey();
  }, [])


  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  const WrappedPaymentComponent = () => {
    return (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    );
  };




  return (
    <>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route extact path='/' element={<Home />} />
          <Route extact path='/product/:id' element={<ProductDetails />} />
          <Route extact path='/category/:category' element={<CategoryProduct />} />
          <Route extact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />


          {/* <Route element={<ProtectedRoute>}> */}
          <Route extact path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route extact path='/me/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route extact path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
          <Route extact path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
          <Route extact path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
          <Route extact path='/process/payment' element={<ProtectedRoute><WrappedPaymentComponent /></ProtectedRoute>} />
          <Route extact path='/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route extact path='/orders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route extact path='/order/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

          {/* admin */}
          <Route isAdmin={true} extact path='/admin/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route isAdmin={true} extact path='/admin/banners' element={<ProtectedRoute><BannerList /></ProtectedRoute>} />
          <Route isAdmin={true} extact path='/admin/banner/:id' element={<ProtectedRoute><UpdateBanner /></ProtectedRoute>} />
          <Route isAdmin={true} extact path='/admin/banner' element={<ProtectedRoute><NewBanner /></ProtectedRoute>} />


          <Route isAdmin={true} extact path='/admin/coupons' element={<ProtectedRoute><CouponList /></ProtectedRoute>} />
          <Route isAdmin={true} extact path='/admin/coupon' element={<ProtectedRoute><NewCoupon /></ProtectedRoute>} />
          {/* <Route isAdmin={true} extact path='/admin/coupon/:id' element={<ProtectedRoute><UpdateCoupon /></ProtectedRoute>} /> */}

          <Route isAdmin={true} extact path='/admin/products' element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route isAdmin={true} extact path='/admin/product' element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
          <Route isAdmin={true} extact path='/admin/product/:id' element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>} />

          <Route isAdmin={true} extact path='/admin/orders' element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
          <Route isAdmin={true} extact path='/admin/order/:id' element={<ProtectedRoute><ProcessOrder /></ProtectedRoute>} />

          <Route isAdmin={true} extact path='/admin/users' element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
          <Route isAdmin={true} extact path='/admin/user/:id' element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />

          <Route isAdmin={true} extact path='/admin/reviews' element={<ProtectedRoute><ProductReviews /></ProtectedRoute>} />
          {/* admin */}




          <Route extact path='/password/forgot' element={<ForgotPassword />} />
          <Route extact path='/password/reset/:token' element={<ResetPassword />} />



          <Route extact path='/search' element={<Search />} />
          <Route extact path='/about' element={<About />} />
          <Route extact path='/contact' element={<Contact />} />

          <Route extact path='/login' element={<LoginSignUp />} />
          <Route extact path='/cart' element={<Cart />} />


        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
