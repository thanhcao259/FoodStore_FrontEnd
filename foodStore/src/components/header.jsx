import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Language from '../img/language.png';
import Logo from '../img/logo.png';
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cartAction from '../api/cartApi';
import favoriteApi from '../api/favoriteApi';
import orderApi from '../api/orderApi';



function Header(){
    const [isLogin, setIsLogin] = useState (false);
    const [listCartItems, setListCartItems] = useState('');
    const [listFavourtites, setListFavourites] = useState('');
    const [listOrders, setListOrder] = useState('');

    useEffect (() => {
        const token = Cookies.get('token');
        if (token){
            setIsLogin(true);
        }

        const fetchData = async() => {
            try {
                // debugger
                const favoriteList = await favoriteApi.getAll();
                const cartList = await cartAction.getAll();
                const orderList = await orderApi.getByUser();
                setListFavourites(favoriteList);
                setListCartItems(cartList);
                setListOrder(orderList);
            } catch (error) {
                console.log(error);
            }
        };    fetchData();
    },[isLogin]) 

    
    return(
        <div>
            <header class="header">
                <div class="header__top">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="header__top__left">
                                    <ul>
                                        <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
                                        <li>Free Shipping for all Order of $99</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="header__top__right">
                                    {/* <div class="header__top__right__social">
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                        <a href="#"><i class="fa fa-twitter"></i></a>
                                        <a href="#"><i class="fa fa-linkedin"></i></a>
                                        <a href="#"><i class="fa fa-pinterest-p"></i></a>
                                    </div>
                                    <div class="header__top__right__language">
                                        <img src={Language} alt="Language"/>
                                        <div>English</div>
                                        <span class="arrow_carrot-down"></span>
                                        <ul>
                                            <li><a href="#">Spanis</a></li>
                                            <li><a href="#">English</a></li>
                                        </ul>
                                    </div> */}
                                    <div class="header__top__right__auth">
                                        {isLogin === true 
                                        ? 
                                        <div>
                                            <Link to="/profile">
                                                <i className='fa fa-user'></i>
                                            </Link>
                                        </div>
                                        :
                                        <Link to="/login" style={{ textDecoration: 'none'}}><i class="fa fa-user"></i> Đăng nhập</Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="header__logo">
                                <Link to="/Home"><img src={Logo} alt="Logo"/></Link>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <nav class="header__menu">
                                {/* <Content/> */}
                            </nav>
                        </div>
                        <div class="col-lg-3">
                            <div class="header__cart">
                                <ul>
                                    {isLogin === true 
                                        ? 
                                        <>
                                            <li><Link to="/favourite-list"><i class="fa fa-heart"></i><span>{listFavourtites.length}</span></Link></li>
                                            <li><Link to="/orders"><i class="fa fa-shopping-bag"></i> <span>{listOrders.length}</span></Link></li>
                                            <li><Link to="/shopping-cart"><i class="fa fa-shopping-cart"></i> <span>{listCartItems.length}</span></Link></li>
                                        </>
                                        :
                                        <>
                                            <li onClick={() => toast.info("Please login!")}><Link to='/login'><a href='#'><i class="fa fa-heart"></i></a></Link></li>
                                            <li onClick={() => toast.info("Please login!")}><Link to='/login'><a href='#'><i class="fa fa-shopping-bag"></i></a></Link></li>
                                            <li onClick={() => toast.info("Please login!")}><Link to='/login'><a href='#'><i class="fa fa-shopping-cart"></i></a></Link></li>
                                        </>
                                    }
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    <div class="humberger__open">
                        <i class="fa fa-bars"></i>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
