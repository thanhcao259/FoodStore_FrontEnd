import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate, useParams } from 'react-router-dom';
import listCategories from "../api/listCategories";
import { Box } from "@mui/material";
import {IconButton} from "@mui/material";
import deleteCategory from "../api/deleteCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import orderApi from "../api/orderApi";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axiosAdmin from "../api/axiosAdmin";
import axiosClient from "../api/axiosClient";

function AdminOrderDetail(){
    
    const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await orderApi.getDetailOrderAdmin(id);
            console.log(response);
            setData(response);
        } catch (err) {
            console.log("Err with fetch data: ", err)
        }
    }
   
    // const handleUpdateStatus = async(id, statusOrder) => {
    //     if (statusOrder === 'Confirming'){
    //         try {
    //             await orderApi.updateStatus(id, 2);
    //             fetchData();
    //             toast.success("Successfully Confirm! Processing package");
    //         } catch (error) {
    //             console.log(error);
    //             toast.error("Failed");
    //         }
    //     }
    //     if (statusOrder === 'Packing'){
    //         try {
    //             await orderApi.updateStatus(id, 3);
    //             fetchData();
    //             toast.success("Success Package! Wait for delivery");
    //         } catch (error) {
    //             console.log(error);
    //             toast.error("Failed");
    //         }
    //     }
    //     if (statusOrder === 'Wait for delivering'){
    //         try {
    //             await orderApi.updateStatus(id, 4);
    //             fetchData();
    //             toast.success("Success delivery! Processing package");
    //         } catch (error) {
    //             console.log(error);
    //             toast.error("Failed");
    //         }
    //     }
    // };

    // const handleCancelOrder = async(id) => {
    //     try {
    //         await orderApi.updateStatus(id, 6);
    //         fetchData();
    //         toast.success("Cancel order success");
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed");
    //     }
    // };

    const columns = [
        {
            name: 'Tên sản phẩm',
            selector: row=>row.name,
            sortable: true,
        },
        {
            name: 'Giá',
            selector: row=>row.price,
            sortable: true,
            cell: row => formatPrice(row),
        },
        {
            name: 'Giảm giá',
            selector: row=>row.discount,
            sortable: true,
        },
        {
            name: 'Số lượng',
            selector: row=>row.quantity,
            sortable: true,
            
        },
        {
            name: 'Tổng tiền',
            selector: row=>row.totalPrice,
            sortable: true,
            cell: row => formatTotal(row),
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

    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    // const paginatedData = data.slice((currentPage - 1) * 10, currentPage * 10);

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const formatTotal = (row) => {
        return formattedAmount.format(row.totalPrice);
    };

    const formatPrice = (row) => {
        return formattedAmount.format(row.price);
    };

    return(
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
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item active">Đơn hàng</li>
                        <li className="breadcrumb-item active">Chi tiết</li>
                    </ol>
                    </div>
                </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            {/* <div className="card-footer">
                                <button className="btn btn-danger float-right" style={{marginLeft: '10px'}}
                                    onClick={handleCancelOrder(id)}>Hủy đơn</button>
                                <button className="btn btn-success float-right"
                                    onClick={handleUpdateStatus(id)}>Xác nhận</button>
                            </div> */}
                        

                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <DataTable
                                columns={columns}
                                data={data}
                                customStyles={customStyles}
                                pagination
                                // paginationTotalRows={data.length}
                                // onChangePage={handleChangePage}
                            />
                        </div>
                        
                        {/* /.card-body */}
                    </div>
                    
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>

    );
}

export default AdminOrderDetail;