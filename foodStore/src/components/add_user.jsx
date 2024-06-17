import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import registerApi from "../api/registerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    const handleAddUser = async () => {
        try {
            const postData = {
                "fullName": fullName,
                "username": userName,
                "password": password,
                "phone": phoneNumber,
                "email": email
            };
            registerApi.add(postData)
            .then(response =>{
                console.log('Registration successful: '+response);
            })
            .catch(err => {
                console.error('Error during registration: ', err);
            });
            toast.success("Add user success");
            navigate('/admin/Registrations');
        } catch (error){
            console.log(error);
            toast.error("Failed");
        }
    };
    
    return(
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1>Thêm khách hàng</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item">Khách hàng</li>
                        <li className="breadcrumb-item active">Thêm khách hàng</li>
                    </ol>
                    </div>
                </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                <div className="row">
                    {/* left column */}
                    <div className="col-md-12">
                    {/* jquery validation */}
                    <div className="card card-primary">
                        <div className="card-header">
                        <h3 className="card-title">Mẫu thêm khách hàng</h3>
                        </div>
                        {/* /.card-header */}
                        {/* form start */}
                        <form id="quickForm">
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Họ và tên</label>
                                <input type="text" name="FullName" className="form-control" placeholder="Nhập tên" 
                                value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Số điện thoại</label>
                                <input type="text" name="PhoneNumber" className="form-control" placeholder="Nhập số điện thoại" 
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Nhập email" 
                                value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Tên đăng nhập</label>
                                <input type="text" name="UserName" className="form-control" placeholder="Nhập tên đăng nhập" 
                                value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                <input type="password" name="password" className="form-control" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary float-right" onClick={handleAddUser}>Thêm</button>
                        </div>
                        </form>
                    </div>
                    {/* /.card */}
                    </div>
                    {/*/.col (left) */}
                    {/* right column */}
                    <div className="col-md-6">
                    </div>
                    {/*/.col (right) */}
                </div>
                {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    );
}

export default AddUser;