import React, { useEffect, useState } from "react";
import Banner1 from '../img/banner/banner-1.jpg';
import Banner2 from '../img/banner/banner-2.jpg';
import '../css/hero_setbg.css';
import listProducts from "../api/listProducts";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import cartAction from "../api/cartApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Featured(){
    const [products, setProducts] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchData();
    },[]);

    const fetchData = async () => {
        try{
            const response = await listProducts.get();
            setProducts(response.slice(0, 8));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
    };

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });


    return(
        <div>
            <div class="banner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <div class="banner__pic">
                                <img src={Banner1} alt=""/>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <div class="banner__pic">
                                <img src={Banner2} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="featured spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title">
                                <h2>Featured Product</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row featured__filter">
                        {
                            loading ? (
                                <Loading/>
                            ) : (
                                <>
                                    {products && products.map((item) => (
                                        <div class="col-lg-3 col-md-4 col-sm-6 product-box" key={item.id}>
                                            <Link to={`/shop-details/${item.id}`} style={{ textDecoration: 'none' }}>
                                                <div class="featured__item">
                                                    <div class="featured__item__pic set-bg" style={{backgroundImage: `url(${item.urlImage})`}}>
                                                        {/* <ul class="featured__item__pic__hover">
                                                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                                            <li><a href="#"><i class="fa fa-shopping-cart" ></i></a></li>
                                                        </ul> */}
                                                    </div>
                                                    <div class="featured__item__text">
                                                        <h6>{item.name}</h6>
                                                        <h5>{formattedAmount.format(item.price)}</h5>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Featured;