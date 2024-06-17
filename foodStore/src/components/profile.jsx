import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import profileApi from "../api/profileApi";
import { error } from "jquery";
import Avatar from "../img/Avatar.png";

function AccountSetting(){
    const [isLogin, setIsLogin] = useState (false);
    const [avatar, setAvatar] = useState(Avatar);
    const navigate = useNavigate();

    useEffect (() => {
        const token = Cookies.get('token');
        if (token){
            setIsLogin(true);
        }
    },[isLogin]) 

    const [data, setData] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await profileApi.get();
            setData(response);
            if (response.urlAvatar !== null) {
                setAvatar(response.urlAvatar);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleLogOut = () => {
        Cookies.remove('token');
        setIsLogin(false);
        navigate("/Home");
    };
    return(
        <div> 
            <div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                       
                                            <div>
                                                <div className="text-center">
                                                    <img className="profile-user-img img-fluid img-circle" src={avatar} alt="User profile picture" style={{ width: '125px', height: '125px' }}/>
                                                </div>
                                                <h3 className="profile-username text-center">{data.fullName}</h3>
                                                <ul className="list-group list-group-unbordered mb-3" style={{ marginTop: '15px'}}>
                                                    <li className="list-group-item">
                                                        <b>Email</b> <a className="float-right">{data.email}</a>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <b>Điện thoại</b> <a className="float-right">{data.phone}</a>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <b>Ngày sinh</b> <a className="float-right">{data.birthDate}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        
                                        <Link to="/profile/update"><button  className="btn btn-primary btn-block"><b>Cập nhật thông tin</b></button></Link>
                                        <button  className="btn btn-danger btn-block" style={{ marginTop: '5px' }} onClick={handleLogOut}><b>Đăng xuất</b></button>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AccountSetting;