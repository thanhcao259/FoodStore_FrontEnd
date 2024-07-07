import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import registerApi from "../api/registerApi";
import "../css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyRegister() {
    const [userName, setUserName] = useState('');
    const [otp, setOTP] = useState();


    // const isPasswordCorrect = password === confirmPassword;
    const isOTP = otp;
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please input otp"); return;
        }

        try {
            const postData = {
                username: userName,
                otp: otp,
            };
            const response = await registerApi.verify(postData);
            console.log("verify ", response);
            navigate('/login');
            toast.success("Verify success!");
        } catch (error) {
            if (error.response) {
                // Error response from backend
                switch (error.response.status) {
                    case 404:
                        toast.error("User or OTP not found");
                        break;
                    case 409:
                        toast.error("Username already exists");
                        break;
                    default:
                        toast.error("An error occurred");
                        break;
                }
            } else {
                // Other errors (network errors, etc)
                toast.error("Verify failed");
            }
        }
    };

    return (
        <div>
            <section class="login">
                <div class="login-form-box">
                    <div class="form-value">
                        <form class="login-form" action="">
                            <h2>Xác Thực Đăng Ký </h2>
                           
                            <div class="inputbox">
                                <ion-icon name="person-outline"></ion-icon>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                                <label for="">Tên đăng nhập</label>
                            </div>
                            <div class="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />
                                <label for="">Mã OTP</label>
                            </div>
                           
                            <button type="submit" class="btn-login" onClick={handleRegister}>Xác thực</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default VerifyRegister;