import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import registerApi from "../api/registerApi";
import "../css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isPasswordCorrect = password === confirmPassword;

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (isPasswordCorrect) {
            try {
                const postData = {
                    "fullName": fullName,
                    "username": userName,
                    "password": password,
                    "phone": phoneNumber,
                    "email": email
                };
                const response = await registerApi.add(postData);
                console.log("data ", postData);
                if(response.status === 201 || response.status === 200){
                    navigate('/verify_register');
                    toast.success("Register success!");
                } if (response.status === 409) {
                    toast.error("Email already exists");
                } else {
                    const errorMessage = response.data?.message || "Register failed";
                    toast.error(errorMessage);
                    console.log("Another error: ", response);
                }
                
            } catch (error) {
                toast.error("Register failed ");
                console.log("err during register", error);
            }
        } else{
            toast.error("Password is invalid");
        }
    };

    return(

        <div>
            <section class="login">
                <div class="register-form-box">
                    <div class="form-value">
                        <form class="login-form" action="">
                            <h2>Đăng ký</h2>
                            <div class="inputbox">
                                <ion-icon name="person-circle-outline"></ion-icon>
                                <input className="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                                <label for="">Họ tên</label>
                            </div>
                            <div class="inputbox">
                                <ion-icon name="call-outline"></ion-icon>
                                <input className="phoneNumber" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                                <label for="">Số điện thoại</label>
                            </div>
                            <div class="inputbox">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input className="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <label for="">Email</label>
                            </div>
                            <div class="inputbox">
                                <ion-icon name="person-outline"></ion-icon>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                                <label for="">Tên đăng nhập</label>
                            </div>
                            <div class="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input className="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                                <label for="">Mật khẩu</label>
                            </div>
                            <div class="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input className="confimPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                <label for="">Xác nhận mật khẩu</label>
                            </div>
                            <button class="btn-login" onClick={handleRegister} >Đăng ký</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register