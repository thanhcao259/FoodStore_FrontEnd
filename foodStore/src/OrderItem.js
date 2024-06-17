import React from 'react'
import Humberger from './components/humberger';
import './sass/style.scss';
import Header from './components/header';
import ShopHero from './components/shop_hero';
import Footer from './components/footer';
import Breadcrumb from './components/breadcrumb';
import OrderItem from './components/OrderItem';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function OrderDetail() {
    return(
        <div >
            <Humberger/>
            <Header/>
            <ShopHero/>
            <Breadcrumb/>
            <OrderItem/>
            <Footer/>
        </div>
    )
}

export default OrderDetail;