import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from 'react-router-dom';
import listCategories from "../api/listCategories";
import { Box } from "@mui/material";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import deleteCategory from "../api/deleteCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminCategories(){
    const [data, setData] = useState([

    ]);

    useEffect(() => {

        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await listCategories.get();
            setData(response);
            console.log({response})
            
        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory.delete(id);
            fetchData();
            toast.success("Delete category success");
        } catch (error) {
            console.log(error);
            toast.success("Delete category failed");
        }
    }
    
       
    const columns = [
        {
            name: 'Id',
            // selector: 'id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Tên',
            //selector: 'name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Mô tả',
            //selector: 'description',
            selector: row => row.description,
            sortable: true,
        },
        { name: 'Tác vụ', cell: (row) => (
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "70px" }}>
                <Link to={`/admin/category/edit/${row.id}`}>
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
     };

    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const paginatedData = data.slice((currentPage - 1) * 10, currentPage * 10);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin/Add-Category');
    };

    return(
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1>Danh mục</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item active">Danh mục</li>
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
                        {/* <h2 className="card-title">DataTable with categories</h2> */}
                        <div className="card-footer">
                            <button className="btn btn-primary float-right" 
                            onClick={handleClick}><ion-icon name="add-outline"></ion-icon>Thêm danh mục</button>
                        </div>

                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <DataTable
                                columns={columns}
                                data={data}
                                customStyles={customStyles}
                                // pagination
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

export default AdminCategories;