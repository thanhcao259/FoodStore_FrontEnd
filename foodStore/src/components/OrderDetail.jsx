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

function OrderDetail() {
    const [totalQuantity, setTotalQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const [loading, setLoading] = useState(true);
    const [listItem, setListItem] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    let sumPrice = 0;
    let sumQuantity = 0;
    const { id } = useParams();
    const [data, setData] = useState([]);

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
            setData(response);
            setLoading(false);

        } catch (err) {
            console.log(err);
        }
    };

    // Log state data whenever it changes
    useEffect(() => {
        console.log('State data:', data);
    }, [data]);

    if (!data) {
        return (
            <div> Loading....</div>
        )
    }

    const goDetailProduct = async (proId) => {
        <Link to={'/shop-details/:proId'}></Link>
    };
    const columns = [
        // { name: "Product Id", selector: row => row.productId, sortable: true },
        { name: "Product", selector: row => row.name, sortable: true },
        { name: "Quantity", selector: row => row.quantity, sortable: true },
        { name: "Total price", selector: row => row.totalPrice, sortable: true, cell: row => formatTotal(row), },
        { name: "Discount", selector: row => row.discount, sortable: true, cell: row => formatDiscount(row) },
        { name: "Price", selector: row => row.price, sortable: true, cell: row => formatPrice(row) },
        {
            name: 'Detail Product', cell: (row) => (
                <Link to={`/shop-details/${row.productId}`}><Box sx={{ display: "flex", justifyContent: "space-between", width: "70px" }}>
                    <IconButton aria-label="check" onClick={() => goDetailProduct(row.id)}>
                        <VisibilityIcon sx={{ color: '#3572EF' }} />
                    </IconButton>

                </Box></Link>
            ),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
            },
        },
        rows: {
            hover: {
                backgroundColor: 'rgba(236, 236, 236, 0.8)',
            },
        },
    };

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


    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Chi tiết đơn hàng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/Home">Home</Link></li>
                                <li className="breadcrumb-item active">Đơn hàng</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title"></h2>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <DataTable
                                        columns={columns}
                                        data={data}
                                        customStyles={customStyles}
                                        pagination
                                        paginationTotalRows={data.length}
                                    />
                                    {/* {data.map(item => (
                                        <div key={item.id}>
                                            ten sp: {item.name}

                                            </div>
                                    ))} */}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>

    );


}
export default OrderDetail