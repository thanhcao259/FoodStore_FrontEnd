
import Logo from '../img/logo.png';
import Language from '../img/language.png';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';

function Humberger(){
    return(
        <div>
            <div class="humberger_menu_overlay"></div>
            <div class="humberger__menu__wrapper">
                <div class="humberger__menu__logo">
                    <img src={Logo} alt="Logo"/>
                </div>
                <div class="humberger__menu__cart">
                    <ul>
                        <li> <FontAwesomeIcon icon={faHeart}/> </li>
                        <li> <FontAwesomeIcon icon={faShoppingBag}/></li>
                    </ul>
                    <div class="header__cart__price">item: <span>$150.00</span></div>
                </div>
                <div class="humberger__menu__widget">
                    <div class="header__top__right__language">
                    <img src={Language} alt="Language"/>
                    <div>English</div>
                    <span class="arrow_carrot-down"></span>
                        <ul>
                            <li><a href="#">Spanis</a></li>
                            <li><a href="#">English</a></li>
                        </ul>
                    </div>
                    <div class="header__top__right__auth">
                        <a href="#"><FontAwesomeIcon icon={faUser} /> Login</a>
                    </div>
                </div>
                <nav class="humberger__menu__nav mobile-menu">
                    <ul>
                        <li class="active"><a href="">Home</a></li>
                        <li><a href="">Shop</a></li>
                        <li><a href="#">Pages</a>
                            <ul class="header__menu__dropdown">
                                <li><a href="">Shop Details</a></li>
                                <li><a href="">Shoping Cart</a></li>
                                <li><a href="">Check Out</a></li>
                                <li><a href="">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><a href="">Blog</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
                <div class="header__top__right__social">
                    <a href="#"> <i class='fa fa-facebook'></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-linkedin"></i></a>
                    <a href="#"><i class="fa fa-pinterest-p"></i></a>
                </div>
                <div class="humberger__menu__contact">
                    <ul>
                        <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
                        <li>Free Shipping for all Order of $99</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Humberger