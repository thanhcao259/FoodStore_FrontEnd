import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import listProducts from "../api/listProducts";
import listCategories from "../api/listCategories";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProduct () {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [listCategory, setListCategory] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    
    const fetchData = async() => {
        try {
            const response = await listProducts.getById(id);
            setName(response.name);
            setAmount(response.available);
            setDiscount(response.discount);
            setPrice(response.price);
            setDescription(response.description);
            setImagePreview(response.urlImage);
            setCategory(response.category_id);
            const categories = await listCategories.get();
            setListCategory(categories);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const imgFile = e.target.files[0];
        setImage(imgFile);
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
            // if (reader.readyState === 2) {
            //     setImagePreview(reader.result);
            // }
        };
        reader.readAsDataURL(imgFile);
    };

    const handleSelected = (e) => {
        setCategory(e.target.value);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category_id", category);
            formData.append("available", amount);
            formData.append("discount", discount);
            formData.append("price", price);
            formData.append("description", description)
            // formData.append("image", image)
            if(image){
                formData.append("image", image);
            }
            await listProducts.update(id, formData);
            setLoading(false);
            navigate('/admin/Products');
            toast.success("Update product success");
        } catch (error) {
            console.log(error);
            toast.error("Update product failed");
            setLoading(true);
        }
    };

    
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1>Cập nhật sản phẩm</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={"/admin/Products"}>Sản phẩm</Link></li>
                        <li className="breadcrumb-item active">Cập nhật</li>
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
                        <h3 className="card-title">Mẫu cập nhật</h3>
                        </div>
                        {/* /.card-header */}
                        {/* form start */}
                        <form id="quickForm" method="post" encType="multipart/form-data" onSubmit={handleUpdateProduct}>
                        <div className="card-body">
                        <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên</label>
                                <input type="text" name="Name" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Loại</label>
                                <select value={category} onChange={handleSelected} style={{ marginLeft: '10px'}}>
                                    {
                                        listCategory && 
                                        listCategory.map(item => { if (item === category){return (
                                            <option key={item.id} value={item.id} selected = "selected">  
                                                {item.name}
                                            </option>
                                        )}
                                        return (
                                            <option key={item.id} value={item.id}>  
                                                {item.name}
                                            </option>
                                        )})
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Số lượng</label>
                                <input type="text" name="Amount" className="form-control" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Giá cả</label>
                                <input type="text" name="Price" className="form-control" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Giảm giá</label>
                                <input type="text" name="Discount" className="form-control" placeholder="Enter discount" value={discount} onChange={(e) => setDiscount(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Thông tin sản phẩm</label>
                                {/* <input type="text" name="Description" className="form-control" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required/> */}
                                <ReactQuill style={{height:'100px'}} theme="snow"  value={description} onChange={setDescription} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Hình ảnh</label>
                                <img className="previewImage" alt="Preview Image" src={imagePreview}/>
                                <input type="file" name="Image" className="form-control" accept="image/*"  onChange={handleChange} />
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary float-right"  disabled={isLoading}>Cập nhật</button>
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
    )
}

export default EditProduct;