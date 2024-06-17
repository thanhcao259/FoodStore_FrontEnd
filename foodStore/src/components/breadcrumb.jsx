import React from "react";
import { Link, useParams } from 'react-router-dom';
import '../css/hero_setbg.css';

function Content(){
    const currentPage = window.location.pathname;
    const {id} = useParams();
    const {searchKey} = useParams();

    console.log(searchKey);
    switch(currentPage){
        case `/Shop/${id}`:
            return <div>
                <h2>Organi Shop</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Cửa hàng</span>
                </div>
            </div>;
        case `/shop/search/${searchKey}`:
            return <div>
                <h2>Organi Shop</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home">Home</Link>
                    <span>Shop</span>
                </div>
            </div>;
        case `/shop-details/${id}`:
            return <div>
                <h2>Thông tin sản phẩm</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Chi tiết</span>
                 </div>
            </div>;
        case '/shopping-cart':
            return <div>
                <h2>Giỏ hàng</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Giỏ hàng</span>
                </div>
            </div>
        case '/favourite-list':
            return <div>
                <h2>Danh sách yêu thích</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Danh sách yêu thích</span>
                </div>
            </div>
        case '/contact':
            return <div>
                <h2>Contact Us</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home">Home</Link>
                    <span>Contact Us</span>
                </div>
            </div>;
        case '/check-out':
            return <div>
                <h2>Đặt hàng</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Đặt hàng</span>
                </div>
            </div>;
        case '/profile':
            return <div>
                <h2>Thông tin người dùng</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Thông tin người dùng</span>
                </div>
            </div>;
        case '/profile/update':
            return <div>
                <h2>Thông tin người dùng</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home"style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Cập nhật thông tin</span>
                </div>
            </div>;
        case '/profile/update-password':
            return <div>
                <h2>Thông tin người dùng</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Cập nhật mật khẩu</span>
                </div>
            </div>;
        case '/orders':
            return <div>
                <h2>Đơn hàng</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Đơn hàng</span>
                </div>
            </div>;
        default:
            return <div>
                <h2>Organi Shop</h2>
                <div class="breadcrumb__option">
                    <Link to="/Home" style={{ textDecoration: 'none'}}>Trang chủ</Link>
                    <span>Cửa hàng</span>
                </div>
            </div>; 
    }
}

function Breadcrumb(){
    return(
        <div>
            <section class="breadcrumb-section set-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <div class="breadcrumb__text">
                                <Content/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Breadcrumb;