import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import listCategories from "../api/listCategories";
import listProducts from "../api/listProducts";
import listUsers from "../api/listUsers";
import orderApi from "../api/orderApi";

function Dashboard(){
    const [categoryAmount, setCategoryAmount] = useState('');
    const [productAmount, setProductAmount] = useState('');
    const [userAmount, setUserAmount] = useState('');
    const [orderAmount, setOrderAmount] = useState('');

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async() => {
        try {
            const categories = await listCategories.get();
            const products = await listProducts.get();
            const users = await listUsers.get();
            const orders = await orderApi.getAll();
            setOrderAmount(orders.length);
            setCategoryAmount(categories.length);
            setProductAmount(products.length);
            setUserAmount(users.length);
        } catch (error) {
            console.log(error);
        }
    }

    
    return(
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Dashboard</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                
                    <section className="content">
                        <div className="container-fluid">
                            {/* Small boxes (Stat box) */}
                            <div className="row">
                                <div className="col-lg-3 col-6">
                                    {/* small box */}
                                    <Link to="/admin/Orders">
                                        <div className="small-box bg-info">
                                            <div className="inner">
                                                <h3>{orderAmount}</h3>
                                                <p>Danh sách đơn hàng</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag" />
                                            </div>
                                            <a href="#" className="small-box-footer">Tìm hiểu thêm <i className="fas fa-arrow-circle-right" /></a>
                                        </div>
                                    </Link>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-3 col-6">
                                    {/* small box */}
                                    <Link to="/admin/Categories">
                                        <div className="small-box bg-success">
                                            <div className="inner">
                                                <h3>{categoryAmount}</h3>
                                                <p>Danh sách danh mục</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-android-apps" />
                                            </div>
                                            <a href="#" className="small-box-footer">Tìm hiểu thêm <i className="fas fa-arrow-circle-right" /></a>
                                        </div>
                                    </Link>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-3 col-6">
                                    {/* small box */}
                                    <Link to="/admin/Products">
                                        <div className="small-box bg-warning">
                                            <div className="inner">
                                                <h3>{productAmount}</h3>
                                                <p>Danh sách sản phẩm</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-ios-nutrition" />
                                            </div>
                                            <a href="#" className="small-box-footer">Tìm hiểu thêm <i className="fas fa-arrow-circle-right" /></a>
                                        </div>
                                    </Link>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-3 col-5">
                                    {/* small box */}
                                    <Link to="/admin/Registrations">
                                        <div className="small-box bg-danger">
                                            <div className="inner">
                                                <h3>{userAmount}</h3>
                                                <p>Danh sách khách hàng</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-person-add" />
                                            </div>
                                            <a href="admin/Registrations" className="small-box-footer">Tìm hiểu thêm <i className="fas fa-arrow-circle-right" /></a>
                                        </div>
                                    </Link>
                                </div>
                            
                            </div>
                        </div>
                    </section>
                </div>
    );
}


export default Dashboard;