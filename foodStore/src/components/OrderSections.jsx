import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../css/hero_setbg.css';
import favoriteApi from "../api/favoriteApi";
import Loading from "./Loading";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import orderApi from "../api/orderApi";


function OrdersSection() {
    const [loading, setLoading] = useState(true);
    const [listOrders, setListOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // debugger
            const response = await orderApi.getByUser();
            setListOrders(response)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const formattedDate = new Date();

    const handleReceiveOrder = async (orderId) => {
        try {
            await orderApi.receivedOrder(orderId);
            fetchData();
            toast.success("Success! Thank you for shopping");
        } catch (error) {
            console.log(error);
            toast.error("Failed");
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await orderApi.cancelOrder(orderId);
            fetchData();
            toast.success("Success! We will cancel your order");
        } catch (error) {
            console.log(error);
            toast.error("Failed");
        }
    };

    return (
        <div>
            {
                loading ? (
                    <Loading />
                ) : (
                    <section className="checkout spad">
                        <div className="container">
                            <div class="checkout__form">
                                <h4>Danh sách đơn hàng</h4>
                                <div>
                                    <div className="row">
                                        {
                                            listOrders && listOrders.map((item) => (
                                                <div class="col-lg-6 col-md-6" style={{ marginTop: '20px' }}>
                                                    <div class="checkout__order">
                                                        <ul>
                                                            <li>Địa chỉ<span>{item.address.address}</span></li>
                                                            <li>Số mặt hàng<span>{item.cartItemResponseDTOs.length}</span></li>
                                                            <li>Trạng thái<span>{item.statusOrder}</span></li>
                                                            <li>Thanh toán<span>{item.vnPayResponseDTO === null ? "Chưa thanh toán" : "Đã thanh toán"}</span></li>
                                                            <li>Ngày đặt hàng<span>{item.deliveryTime.slice(0,10)}</span></li>
                                                        </ul>
                                                        <div class="checkout__order__total">Tổng <span>{formattedAmount.format(item.totalPrice)}</span></div>

                                                        {
                                                            item.statusOrder === 'Delivered' ? (
                                                                <button className="btn btn-success" onClick={() => handleReceiveOrder(item.id)}>Đã nhận hàng</button>
                                                            ) : item.statusOrder === 'Confirming' ? (
                                                                <button className="btn btn-danger" onClick={() => handleCancelOrder(item.id)}>Hủy đơn hàng</button>
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                        <Link to={`/detail-order/${item.id}`}><button className="btn btn-primary">Chi tiết</button>
                                                        </Link>

                                                    </div>
                                                </div>
                                            ))
                                        }
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

export default OrdersSection