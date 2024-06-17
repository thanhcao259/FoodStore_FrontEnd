import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import loginApi from "../api/loginApi";
import resetPasswordApi from "../api/resetPasswordApi";
import identificationApi from "../api/identificationApi";
import "../css/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from "../utils/auth";


function SendEmail() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataSubmit = { email };
            const fetchSubmit = await resetPasswordApi.verifyMail(dataSubmit);
            if(fetchSubmit){
                console.log('Submit email successful: ', fetchSubmit);

            } toast.success("Send email success!!!", {
                position: toast.POSITION.TOP_RIGHT,
            }); navigate('/forgot-password/reset-password');
        } catch {
            toast.error("Send email fail!!!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div>
            <section class="login">
                <div class="form-box">
                    <div class="form-value">
                        <form class="login-form" action="">
                            <h2>Quên mật khẩu</h2>
                            <div class="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label for="">Nhập email đăng ký</label>
                            </div>
                            {/* <div class="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <label for="">Mật khẩu</label>
                            </div>
                            <div class="forget">
                                <label for=""><input type="checkbox"/>Ghi nhớ tôi<Link to='/forgot-password' style={{ marginLeft: '110px'}}>Quên mật khẩu</Link></label>
                            
                            </div> */}
                            <button class="btn-login" onClick={handleSubmit}>Submit</button>
                            <div class="register">
                                <p>Bạn không có tài khoản ư<Link to="/register"> Đăng ký</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SendEmail