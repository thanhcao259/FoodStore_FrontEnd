import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from 'react-router-dom';
import listUsers from "../api/listUsers";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function UserRegistration(){
    
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try{
            const response = await listUsers.get();
            setData(response);
            console.log(data);
        } catch (error) {
            console.log('Error fetching data:', error);
            
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
       
    const columns = [
        {
            name: 'Id',
            selector: row=>row.id,
            sortable: true,
        },
        {
            name: 'Tên đăng nhập',
            selector: row=>row.username,
            sortable: true,
        },
        {
            name: 'Họ tên',
            selector: row=>row.fullName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row=>row.email,
            sortable: true,
        },
        {
            name: 'SĐT',
            selector: row=>row.phone,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row=>row.createdDate,
            sortable: true,
        },
        {
            name: 'Updated Date',
            selector: row=>row.updatedDate,
            sortable: true,
        }
        // { name: 'Actions', cell: (row) => (
        //     <Box sx={{ display: "flex", justifyContent: "space-between", width: "70px" }}>
        //         <IconButton aria-label="edit" >
        //             <EditIcon sx={{ color: '#1976d2' }} />
        //         </IconButton>
        //         <IconButton aria-label="delete">
        //             <DeleteIcon sx={{ color: 'red' }} />
        //         </IconButton>
        //     </Box>
        // ), },

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

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin/Add-User');
    };
    
    
    return(
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1>Khách hàng</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item active">Khách hàng</li>
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
                        {/* <h2 className="card-title">DataTable with users information</h2> */}
                        <div className="card-footer">
                            <button className="btn btn-primary float-right" onClick={handleClick}><ion-icon name="add-outline"></ion-icon>Thêm khách hàng</button>
                        </div>

                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <DataTable
                                columns={columns}
                                data={data}
                                customStyles={customStyles}
                                pagination
                                // paginationTotalRows={data.length}
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

export default UserRegistration;