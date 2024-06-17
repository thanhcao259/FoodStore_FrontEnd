import React, { useState } from "react";
import "../css/login.css";
// import forgotPasswordApi from "../api/forgotPasswordApi";
import {  useNavigate } from "react-router-dom";
import resetPasswordApi from "../api/resetPasswordApi";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset_password() {

    const [isSubmitting, setIsSubmitting] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (password !== confirmPassword) {
            toast.error("Confirm password is correct!"); setIsSubmitting(false);return
        } if (!otp) {
            toast.error("OTP must be filled");setIsSubmitting(false); return
        } 
        const dataSubmit = { email, otp, password};
        try {
            // debugger
            await resetPasswordApi.resetPsw(dataSubmit);
            toast.done("Success ");
            navigate('/login'); 
            //const response = await resetPasswordApi.resetPsw(dataSubmit)
            // console.log('show response: ',response);
            // if (response.status === 200) {
            //     console.log('Submit reset psw: ', response);
            //     navigate('/login'); //setIsSubmitting(false);
            // } else {
            //     toast.error("Fail to reset password!"); 
            // }
        } catch (err) {
            toast.error("Error during reset password!");
            console.log('Err during reset psw: ', err);
        } finally{
            setIsSubmitting(false);
        }

    }
    return (
        <div>
            <section class="login">
                <div class="register-form-box"
                    style={{ height: "auto", padding: "40px" }} >

                    <div class="form-value">
                        <form className="login-form" onSubmit={handleResetPassword}>
                            <h2>Đặt lại mật khẩu</h2>

                            <div className="inputbox">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input
                                    className="email" type="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                /><label>Email</label>
                            </div>

                            <div className="inputbox">
                                <ion-icon name="key-outline"></ion-icon>
                                <input
                                    className="email" type="password" value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    required
                                /> <label>OTP</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input
                                    className="email" type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label>Mật khẩu mới</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input
                                    className="email" type="password" value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label>Xác nhận mật khẩu</label>
                            </div>
                            <button class="btn-login" type="submit" disabled={isSubmitting}>
                                Cập nhật
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Reset_password;