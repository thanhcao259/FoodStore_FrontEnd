import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import ShoppingCart from './shopping-cart';
import Contact from './contact';
import CheckOut from './check_out';
import Login from './components/login';
import Register from './components/register';
import Profile from './profile';
import Admin from './Admin';
import Error from './components/Error';
// import ForgotPassword from './components/ForgotPassword';
// import ResetNewPassword from './components/Reset_password';
import './css/style.css';
import './css/slicknav.min.css';
import './css/elegant-icons.css';
import './css/nice-select.css';
import './css/owl.carousel.min.css';
import ShopDetails from './shop_details';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import FavouriteList from './favoutite_list';
import SearchProduct from './SearchProduct';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFail';
import OrdersList from './OrderList';
import OrderDetail from './OrderItem';
import SendEmail from './components/sendEmail';
import ResetPassword from './components/Reset_password';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        {/* <React.StrictMode> */}
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='Home' element={<Home/>}/>
                    <Route path='Shop/:id' element={<Shop/>}/>
                    <Route path='shop-details/:id' element={<ShopDetails/>}/>
                    <Route path='shop/search/:searchKey' element={<SearchProduct/>}/>
                    <Route path='shopping-cart' element={<ShoppingCart/>}/>
                    <Route path='favourite-list' element={<FavouriteList/>}/>
                    <Route path='contact' element={<Contact/>}/>
                    <Route path='check-out' element={<CheckOut/>}/>
                    <Route path='check-out/create-address' element={<CheckOut/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    {/* <Route path='forgot-password' element={<ForgotPassword/>}/> */}
                    {/* <Route path='reset-password' element={<ResetNewPassword/>}/> */}
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='profile/update' element={<Profile/>}/>
                    <Route path='profile/update-password' element={<Profile/>}/>
                    <Route path='admin' element={<Admin/>}/>
                    <Route path='admin/Dashboard' element={<Admin/>}/>
                    <Route path='admin/Registrations' element={<Admin/>}/>
                    <Route path='admin/Add-User' element={<Admin/>}/>
                    <Route path='admin/Categories' element={<Admin/>}/>
                    <Route path='admin/Add-Category' element={<Admin/>}/>
                    <Route path='admin/Products' element={<Admin/>}/>
                    <Route path='admin/Add-Product' element={<Admin/>}/>
                    <Route path='admin/category/edit/:id' element={<Admin/>}/>
                    <Route path='admin/product/edit/:id' element={<Admin/>}/>
                    <Route path='admin/Orders' element={<Admin/>}/>
                    <Route path='admin/Orders/order-detail/:id' element={<Admin/>}/>
                    <Route path='payment/success' element={<PaymentSuccess/>}/>
                    <Route path='payment/failed' element={<PaymentFailed/>}/>
                    <Route path='orders' element={<OrdersList/>}/>
                    <Route path='detail-order/:id' element={<OrderDetail/>}/>
                    <Route path='/*' element={<Error/>}/>
                    <Route path='/forgot-password/verifyMail' element={<SendEmail/>}/>
                    <Route path='/forgot-password/reset-password' element={<ResetPassword/>}/>
                </Routes>
            </BrowserRouter>
        {/* </React.StrictMode> */}
        <ToastContainer/>
    </>
);


reportWebVitals();
