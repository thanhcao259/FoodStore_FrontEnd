import React, {useState, useEffect} from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../css/hero_setbg.css';
import cartAction from "../api/cartApi";
import Loading from "./Loading";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


function CartSection(){
    
    const [ totalQuantity, setTotalQuantity] = useState('');
    const [ totalPrice, setTotalPrice] = useState('');

    const increaseQuantity = async (idProduct, productQuantity) => {
        await cartAction.updateQuantity(idProduct, productQuantity + 1);
        
        fetchData();
    };


    const decreaseQuantity = async (idProduct, productQuantity) => {
        if (productQuantity > 1) {
            await cartAction.updateQuantity(idProduct, productQuantity - 1);
            fetchData();
        }
    }

    const [listCartItems, setListCartItems] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await cartAction.getAll();
            setListCartItems(response);
            let sumQuantity = 0;
            let sumPrice = 0;
            // debugger
            response.forEach(item => {
                sumQuantity += item.quantity;
                sumPrice += item.totalPrice;
            });
            setTotalQuantity(sumQuantity);
            setTotalPrice(sumPrice);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const handleRemoveItem = async (param) => {
        try {
            await cartAction.remove(param);
            fetchData();
            setLoading(false);
            toast.success("Item removed!");
        } catch (error) {
            console.log(error);
            toast.error("Remove failed");
        }
    };


    return(
        <div>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <section className="shoping-cart spad">
                        <div className="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="shoping__cart__table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="shoping__product">Sản phẩm</th>
                                                    <th>Giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { listCartItems && listCartItems.map((item) => (
                                                    <tr>
                                                        <td class="shoping__cart__item">
                                                            <img className="item_image" src={item.urlImage} />
                                                            <h5>{item.name}</h5>
                                                        </td>
                                                        <td class="shoping__cart__price">
                                                            {formattedAmount.format(item.price - item.price * item.discount)}
                                                        </td>
                                                        <td class="shoping__cart__quantity">
                                                            <div class="quantity">
                                                                <div class="pro-qty">
                                                                    <button className="btn btn-light"  onClick={() => decreaseQuantity(item.productId, item.quantity)}>-</button>
                                                                    <input type="text" value={item.quantity}/>
                                                                    <button className="btn btn-light" onClick={() => increaseQuantity(item.productId, item.quantity)}>+</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="shoping__cart__total">
                                                            {formattedAmount.format(item.totalPrice)}
                                                        </td>
                                                        <td class="shoping__cart__item__close">
                                                            <span class="icon_close" onClick={() => handleRemoveItem(item.productId)}></span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    {/* <div class="shoping__cart__btns">
                                        <a href="#" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
                                        <a href="#" class="primary-btn cart-btn cart-btn-right"><span class="icon_loading"></span>
                                            Upadate Cart</a>
                                    </div> */}
                                </div>
                                <div class="col-lg-6">
                                    {/* <div class="shoping__continue">
                                        <div class="shoping__discount">
                                            <h5>Discount Codes</h5>
                                            <form action="#">
                                                <input type="text" placeholder="Enter your coupon code"/>
                                                <button type="submit" class="site-btn">APPLY COUPON</button>
                                            </form>
                                        </div>
                                    </div> */}
                                </div>
                                <div class="col-lg-6">
                                    <div class="shoping__checkout">
                                        <h5>Thông tin giỏ hàng</h5>
                                        <ul>
                                            <li>Sản phẩm <span>{listCartItems.length}</span></li>
                                            <li>Số lượng <span>{totalQuantity}</span></li>
                                            <li>Tổng <span>{formattedAmount.format(totalPrice)}</span></li>
                                        </ul>
                                        <Link to="/check-out" style={{ textDecoration: 'none' }}><p class="primary-btn">ĐẶT HÀNG</p></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    )
}

export default CartSection