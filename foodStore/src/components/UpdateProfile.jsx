import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import profileApi from "../api/profileApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateProfile () {
    const [data, setData] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState('');

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await profileApi.get();
            setFullName(response.fullName);
            setBirthDate(response.birthDate);
            setEmail(response.email);
            setPhoneNumber(response.phone);
            setImagePreview(response.urlAvatar);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setImage(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("birthDate", birthDate);
            formData.append("phone", phoneNumber);
            if(image){
                formData.append("image", image);
            }
            await profileApi.update(formData);
            setLoading(false);
            toast.success("Update profile success");
            navigate('/profile');
        } catch (error) {
            console.log(error);
            toast.error("Failed");
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
                                    <form id="quickForm" method="post" encType="multipart/form-data" onSubmit={handleUpdateProfile}>
                                        <div className="card-body box-profile">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Họ tên</label>
                                                <input type="text" name="FullName" className="form-control" placeholder="Enter name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Số điện thoại</label>
                                                <input type="text" name="PhoneNumber" className="form-control" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Email</label>
                                                <input type="email" name="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Ngày sinh</label>
                                                <input type="date" name="BirthDate" className="form-control" placeholder="Enter birth date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Ảnh đại diện</label>
                                                <img className="previewImage" alt="Preview Image" src={imagePreview} />
                                                <input type="file" name="Image" className="form-control" accept="image/*"  onChange={handleChange} />
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-block"  disabled={isLoading}><b>Cập nhật</b></button>
                                            <Link to="/profile/update-password"><button className="btn btn-warning btn-block" style={{ marginTop: '5px' }}><b>Đổi mật khẩu</b></button></Link>
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

export default UpdateProfile;