import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import addCategory from "../api/addCategory";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { add } from "lodash";


function AddCategory(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const imgFile = e.target.files[0];
        setImage(imgFile);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(imgFile);
    }

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("image", image);

            await addCategory.add(formData);
            setLoading(false);
            navigate('/admin/Categories');
            toast.success("Add category success!");
        } catch (error){
            console.log(error);
            toast.error("Add category failed!"); setLoading(false);
        }
        
    };

    return(
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1>Thêm danh mục</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item">Danh mục</li>
                        <li className="breadcrumb-item active">Thêm danh mục</li>
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
                        <h3 className="card-title">Mẫu thêm danh mục</h3>
                        </div>
                        {/* /.card-header */}
                        {/* form start */}
                        <form id="quickForm" method="post" encType="multipart/form-data">
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Tên danh mục</label>
                                    <input type="text" name="Name" className="form-control" placeholder="Nhập tên danh mục" 
                                    value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                                <div className="form-group">
                                    <label>Mô tả</label>
                                    <input type="text" name="Description" className="form-control" placeholder="Nhập mô tả" 
                                    value={description} onChange={(e) => setDescription(e.target.value)} required/>
                                </div>
                                <div className="form-group">
                                    <label>Hình ảnh</label>
                                    <img className="previewImage" alt="Preview Image" 
                                    src={imagePreview}/>
                                    <input type="file" name="Image" className="form-control" 
                                    accept="image/*"  onChange={handleChange} required/>
                                </div>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary float-right" 
                                onClick={handleAddCategory} disabled={isLoading}>Thêm</button>
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

export default AddCategory;