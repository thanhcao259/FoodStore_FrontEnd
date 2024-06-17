import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../css/hero_setbg.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IconButton, Box } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cookies from "js-cookie";

import Loading from "./Loading";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import orderApi from "../api/orderApi";

function OrderItem() {
    const [loading, setLoading] = useState(true);
    const [listItem, setListItem] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLogin(true);
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await orderApi.getDetailOrder(id);
            setListItem(response);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    // Log state data whenever it changes
    useEffect(() => {
        console.log('State data:', listItem);
    }, [listItem]);

    if (!listItem) {
        return (
            <div> Loading....</div>
        )
    }

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const formatTotal = (row) => {
        return formattedAmount.format(row.totalPrice);
    };
    const formatPrice = (row) => {
        return formattedAmount.format(row.price);
    }
    const formatDiscount = (row) => {
        return row.discount * 100 + "%";
    }


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
                                                    <th>Giảm giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listItem && listItem.map((item) => (
                                                    <tr>
                                                        <td class="shoping__cart__item">
                                                            <Link to={`/shop-details/${item.productId}`}>
                                                            <img className="item_image" src={item.urlImage} />

                                                            <h5>{item.name}</h5>
                                                            </Link>
                                                        </td>
                                                        <td class="shoping__cart__price">
                                                            <h5>{formattedAmount.format(item.price)}</h5>
                                                        </td>
                                                        <td class="shoping__cart__price">
                                                            <h5>{item.discount * 100}%</h5>
                                                        </td>
                                                        <td class="shoping__cart__quantity">
                                                            <h5>{item.quantity}</h5>
                                                        </td>
                                                        <td class="shoping__cart__total">
                                                            {formattedAmount.format(item.totalPrice)}
                                                        </td>
                                                        
                                                    </tr>
                                                ))}
                                                
                                            </tbody>
                                        </table>
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

export default OrderItem