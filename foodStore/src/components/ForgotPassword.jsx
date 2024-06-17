import React, { useState } from 'react'
import forgotPasswordApi from '../api/forgotPassword'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSendEmail = async (e) => {
        e.preventDefault();
        const rs = await forgotPasswordApi.add(email);
        if (rs === "send mail success") {
            toast.success("Please check your email");
            navigate("/");
        } else {
            toast.error("Your email is invalid");
        }
    };
  return (
    <div>
      <section class="login">
                <div class="form-box">
                    <div class="form-value">
                        <form class="login-form" onSubmit={handleSendEmail}>
                            <h2>Quên mật khẩu</h2>
                            <div class="inputbox">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <label for="">Email</label>
                            </div>
                            <button type='submit' class="btn-login">Gửi</button>
                        </form>
                    </div>
                </div>
        </section>
    </div>
  )
}

export default ForgotPassword
