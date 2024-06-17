import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../css/hero_setbg.css';
import listProducts from "../api/listProducts";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import cartAction from "../api/cartApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Divider } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import commentApi from "../api/commentApi";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";
import identificationApi from "../api/identificationApi";
import favoriteApi from "../api/favoriteApi";

function ProductDetails() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [reviews, setReviews] = useState('');
    const [listComment, setListComment] = useState('');
    const [userInfo, setUserInfo] = useState('');

    const { id } = useParams();
    const idProduct = id;
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [desiredItemExists, setDesiredItemExists] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLogin(true);
        }
        fetchData();
        fetchFavourites();
    }, []);

    const fetchData = async () => {

        try {
            const response = await listProducts.getById(id);
            setName(response.name);
            setAmount(response.available);
            setDiscount(response.discount);
            setPrice(response.price);
            setDescription(response.description);
            setImage(response.urlImage);
            setReviews(response.rate);
            setListComment(response.reviews);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFavourites = async () => {
        try {
            const data = await favoriteApi.getAll();
            const isItemInData = data.some(item => {
                return `${item.id}` === idProduct;
            });
            setDesiredItemExists(isItemInData);

        } catch (error) {
            console.log(error);
        }
    };


    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        if (quantity < amount) {
            setQuantity(quantity + 1);
        } else {
            toast.warning("The amount of product is not enough");
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const pricePerItem = price - price * discount;

    const total = quantity * pricePerItem;

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const handleAddToCart = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("quantity", quantity);
            formData.append("idProduct", id);
            await cartAction.add(formData);
            setIsLoading(false);
            toast.success("Add to cart successfully");
        } catch (error) {
            toast.error("Please login to do!");
        }
    };

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await commentApi.add(id, rating, comment);
            setLoading(false);
            toast.success("Add comment success!");

        } catch (error) {
            console.log(error);
            toast.error("Add comment failed");
        }
    };


    const handleAddFavorite = async (e) => {
        e.preventDefault();
        const fetchIdentify = await identificationApi.get();
        if (fetchIdentify === 'USER') {
            try {
                await favoriteApi.add(id);
                fetchFavourites();
                toast.success("Add favorite success");
            } catch (error) {
                console.log(error);
                toast.error("Add favorite failed");
            }
        }

    }

    const handleRemoveFavourite = async (e) => {
        e.preventDefault();
        try {
            await favoriteApi.remove(id);
            fetchFavourites();
            toast.success("Remove favoutite success!");
        } catch (error) {
            console.log(error);
            toast.error("Remove favoutite failed");
        }
    };

    // const handleDeleteComment = async (id) => {
    //     setLoading(true);
    //     try {
    //         await commentApi.delete(id);
    //         setLoading(false);
    //         toast.success("Delete comment success");
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Delete comment failed");
    //     }
    // };
    return (
        <div>
            {
                loading ? (
                    <Loading />
                ) : (
                    <section className="product-details spad">
                        <div className="container">
                            <div className="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="product__details__pic">
                                        <div class="product__details__pic__item">
                                            <img class="product__details__pic__item--large" src={image} alt="" />
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="product__details__text">
                                        <h3>{name}</h3>
                                        <div class="product__details__rating">
                                            {/* {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    style={{ fontSize: '18px' ,cursor: 'pointer', color: star <= reviews ? 'gold' : 'gray' }}
                                                >
                                                    ★
                                                </span>
                                            ))} */}
                                            <div className="rating-outer">
                                                <div
                                                    className="rating-inner"
                                                    style={{ width: `${reviews / 5 * 100}%` }}>

                                                </div>
                                            </div>
                                            {
                                                reviews === "NaN" ? (
                                                    <span style={{ fontSize: '18px' }}>(0 Đánh giá)</span>
                                                ) : (
                                                    <span style={{ fontSize: '18px' }}>({listComment.length} Đánh giá)</span>

                                                )
                                            }

                                        </div>
                                        <div class="product__details__price" style={{ height: '100px' }}>
                                            {formattedAmount.format(total)}
                                            {
                                                discount > 0 ?
                                                    (
                                                        <div class="product__discount__item__text">
                                                            <div class="product__item__price" ><span style={{ float: 'left', fontSize: '20px' }}>{formattedAmount.format(price)}</span></div>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )
                                            }

                                        </div>
                                        <div class="product__details__quantity">
                                            <div class="quantity">
                                                <div class="pro-qty">
                                                    <button className="btn btn-light" onClick={decreaseQuantity}>-</button>
                                                    <input type="text" value={quantity} />
                                                    <button className="btn btn-light" onClick={increaseQuantity}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="primary-btn" onClick={handleAddToCart} disabled={isLoading}>THÊM VÀO GIỎ</button>
                                        {
                                            !isLogin ? (
                                                <Link to="/login" style={{ textDecoration: 'none' }}><a href="#" class="heart-icon" onClick={() => toast.info("Please login to add favourite")}><span class="icon_heart_alt"></span></a></Link>
                                            )
                                                : desiredItemExists ? (
                                                    <a href="#" class="heart-icon" style={{ color: "#228B22" }} onClick={handleRemoveFavourite}><span class="icon_heart"></span></a>
                                                ) : (
                                                    <a href="#" class="heart-icon" onClick={handleAddFavorite}><span class="icon_heart_alt"></span></a>
                                                )
                                        }

                                        <ul>
                                            <li><b>Số lượng khả dụng</b> <span>{amount}</span></li>
                                            <li><b>Giảm giá</b> <span>{discount * 100}%</span></li>
                                            <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="product__details__tab">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" data-target="#tabs-1" role="tab"
                                                    aria-selected="true">Thông tin sản phẩm</a>
                                            </li>

                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                                <div class="product__details__tab__desc" dangerouslySetInnerHTML={{ __html: description }}>
                                                    {/* {description} */}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div class="product__details__tab">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" data-target="#tabs-1" role="tab"
                                                    aria-selected="true">Bình luận</a>
                                            </li>

                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                                <div class="product__details__tab__desc">
                                                    {
                                                        listComment && listComment.map((item) => (
                                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                                <ListItem alignItems="flex-start">
                                                                    <ListItemText
                                                                        primary={<strong>{item.name}</strong>}
                                                                        secondary={
                                                                            <>
                                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                                    <span
                                                                                        key={star}
                                                                                        style={{ fontSize: '15px', cursor: 'pointer', color: star <= item.rate ? 'gold' : 'gray' }}
                                                                                    >
                                                                                        ★
                                                                                    </span>
                                                                                ))}
                                                                                <br />
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="text.primary"
                                                                                >
                                                                                    {item.contentReviews}
                                                                                </Typography>

                                                                            </>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            </List>
                                                        ))
                                                    }

                                                    {
                                                        isLogin === true
                                                            ?
                                                            (
                                                                <Box sx={{ pt: 5, pl: 3, pb: 3, bgcolor: "#fafafa" }}>
                                                                    <p>
                                                                        Đánh giá:
                                                                        {
                                                                            rating === 5 ? (
                                                                                <strong style={{ marginLeft: '20px', fontSize: '20px' }}>Rất tốt</strong>
                                                                            ) : rating === 4 ? (
                                                                                <strong style={{ marginLeft: '20px', fontSize: '20px' }}>Tốt</strong>
                                                                            ) : rating === 3 ? (
                                                                                <strong style={{ marginLeft: '20px', fontSize: '20px' }}>Tạm ổn</strong>
                                                                            ) : rating === 2 ? (
                                                                                <strong style={{ marginLeft: '20px', fontSize: '20px' }}>Tệ</strong>
                                                                            ) : rating === 1 ? (
                                                                                <strong style={{ marginLeft: '20px', fontSize: '20px' }}>Rất tệ</strong>
                                                                            ) : (
                                                                                <strong style={{ marginLeft: '20px', fontSize: '20px' }}>Your opinion</strong>
                                                                            )
                                                                        }
                                                                    </p>
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <span
                                                                            key={star}
                                                                            onClick={() => handleStarClick(star)}
                                                                            style={{ fontSize: '30px', cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                                                                        >
                                                                            ★
                                                                        </span>
                                                                    ))}

                                                                    <form onSubmit={handleAddComment}>
                                                                        <TextareaAutosize
                                                                            onChange={(e) => setComment(e.target.value)}
                                                                            value={comment}
                                                                            aria-label="minimum height"
                                                                            minRows={3}
                                                                            placeholder="Nhập bình luận..."
                                                                            style={{ width: 400, padding: "5px" }}
                                                                        />
                                                                        <Box sx={{ pt: 1 }}>
                                                                            <Button type='submit' variant='contained' disabled={isLoading}>Đăng</Button>
                                                                        </Box>
                                                                    </form>
                                                                </Box>
                                                            ) : (
                                                                <Link to='/login' style={{ textDecoration: 'none' }}><p>Để bình luận và đánh giá hãy đăng nhập</p></Link>
                                                            )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }

        </div>
    );
}

export default ProductDetails;