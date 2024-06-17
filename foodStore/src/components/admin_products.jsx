import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from 'react-router-dom';
import listProducts from "../api/listProducts";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminProducts(){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try{
            const response = await listProducts.get();
            setData(response);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
    };

    const handleDelete = async (id) => {
        try {
            await listProducts.delete(id);
            fetchData();
            toast.success("Delete product success");
        } catch (error) {
            console.log(error);
            toast.error("Delete product failed");
        }
    }
       
    const columns = [
        { name: 'Id', selector: row => row.id, sortable: true },
        { name: 'Tên', selector: row => row.name, sortable: true },
        { name: 'Loại', selector: row => row.category_id, sortable: true },
        { name: 'Số lượng', selector: row => row.available, sortable: true },
        { name: 'Giá', selector: row => row.price, sortable: true },
        { name: 'Giảm', selector: row => row.discount, sortable: true },
        { name: 'Thông tin', selector: row => row.description, sortable: true },
        { name: 'Tác vụ', cell: (row) => (
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "70px" }}>
                <Link to={`/admin/product/edit/${row.id}`}>
                    <IconButton aria-label="edit" >
                        <EditIcon sx={{ color: '#1976d2' }} />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
            </Box>
        ), },
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
        cells: {
            style: {
               // For each cell
              fontWeight: 'normal', // For each cell
              width: '50px',
            },
         },
     };

    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const paginatedData = data.slice((currentPage - 1) * 10, currentPage * 10);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin/Add-Product');
    };

    return(
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1>Sản phẩm</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item active"><Link to="admin/Products">Sản phẩm</Link></li>
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
                        {/* <h2 className="card-title">DataTable with products</h2> */}
                        <div className="card-footer">
                            <button className="btn btn-primary float-right" onClick={handleClick}><ion-icon name="add-outline"></ion-icon>Thêm sản phẩm</button>
                        </div>

                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <DataTable
                                columns={columns}
                                data={data}
                                customStyles={customStyles}
                                pagination
                                paginationTotalRows={data.length}
                                onChangePage={handleChangePage}
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

export default AdminProducts;