import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import loginApi from "../api/loginApi";
import identificationApi from "../api/identificationApi";
import "../css/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from "../utils/auth";


function Login(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect (() => {
        const token = Cookies.get('token');
        if (token){
            navigate('/Home');
        }
    },[]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const dataLogin = {username, password};
            const fetchLogin = await loginApi.add(dataLogin);
            
            if (fetchLogin && fetchLogin.token) {
                console.log('Response is received: ', fetchLogin)
                // Cookies.set('token', fetchLogin, {expires: 7});
                console.log('Token from login: ', fetchLogin.token)
                setToken( fetchLogin.token )
                const fetchIdentify = await identificationApi.get();
                
                if (fetchIdentify === "ADMIN"){
                    navigate("/admin");
                } else if (fetchIdentify === "USER"){
                    navigate("/Home");
                }
                toast.success("Login success!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            else{
                alert("Đăng nhập không thành công");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Login failed!!!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

    };
    return(
        <div>
            <section class="login">
                <div class="form-box">
                    <div class="form-value">
                        <form class="login-form" action="">
                            <h2>Đăng nhập</h2>
                            <div class="inputbox">
                                <ion-icon name="person-outline"></ion-icon>
                                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} required/>
                                <label for="">Tên đăng nhập</label>
                            </div>
                            <div class="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <label for="">Mật khẩu</label>
                            </div>
                            <div class="forget">
                                <label for=""><input type="checkbox"/>Ghi nhớ tôi<Link to='/forgot-password/verifyMail' style={{ marginLeft: '110px'}}>Quên mật khẩu</Link></label>
                            
                            </div>
                            <button class="btn-login" onClick={handleLogin}>Đăng nhập</button>
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

export default Login