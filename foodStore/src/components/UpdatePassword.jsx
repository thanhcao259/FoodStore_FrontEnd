import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import profileApi from "../api/profileApi";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatePassword () {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const isNewPasswordMatched = newPassword === confirmNewPassword;

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isNewPasswordMatched) { 
            try {
                await profileApi.changePassword(password, newPassword);
                Cookies.remove('token');
                setLoading(false);
                toast.success("Reset password success");
                navigate('/login');
            } catch (error) {
                console.log(error);
                toast.error("Reset password failed");
            }
        } else {
            alert("Mật khẩu không đúng");
            setLoading(true);
        }
    }

    return(
        <>
            <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <div className="card card-primary card-outline">
                                    <form id="quickForm" method="post" encType="multipart/form-data" onSubmit={handleChangePassword}>
                                        <div className="card-body box-profile">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Mật khẩu hiện tại</label>
                                                <input type="password" name="currentPassword" className="form-control" placeholder="Nhập mật khẩu hiện tại" 
                                                onChange={(e) => setPassword(e.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Mật khẩu mới</label>
                                                <input type="password" name="newPassword" className="form-control" placeholder="Nhập mật khẩu mới" 
                                                onChange={(e) => setNewPassword(e.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Xác nhận mật khẩu mới</label>
                                                <input type="password" name="cofirmNewPassword" className="form-control" placeholder="Xác nhận mật khẩu mới" 
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}><b>Cập nhật</b></button>
                                        </div>
                                    </form>
                                    {/* /.card-body */}
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
}

export default UpdatePassword;