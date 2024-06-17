import React, {useState, useEffect} from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../css/hero_setbg.css';
import favoriteApi from "../api/favoriteApi";
import Loading from "./Loading";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


function FavouritesSection(){
    

    const [listFavourtites, setListFavourites] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await favoriteApi.getAll();
            setListFavourites(response);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const handleRemoveItem = async (idProduct) => {
        try {
            await favoriteApi.remove(idProduct);
            fetchData();
            setLoading(false);
            toast.success("Item removed!");
        } catch (error) {
            console.log(error);
            toast.error("Remove failed");
        }
    };


    return(
        <div>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <section className="shoping-cart spad">
                        <div className="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="shoping__cart__table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="shoping__product">Sản phẩm</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Giá</th>
                                                    {/* <th>Quantity</th>
                                                    <th>Total</th> */}
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { listFavourtites && listFavourtites.map((item) => (
                                                    <tr>
                                                        <td class="shoping__cart__item">
                                                            <Link to={`/shop-details/${item.id}`}>
                                                                <img className="item_image" src={item.urlImage} />
                                                                <h5>{item.name}</h5>
                                                            </Link>
                                                        </td>
                                                        
                                                        <td class="shoping__cart__quantity">
                                                            
                                                        </td>
                                                        <td class="shoping__cart__total">
                                                            
                                                        </td>
                                                        <td class="shoping__cart__price">
                                                            {formattedAmount.format(item.price - item.price * item.discount)}
                                                        </td>
                                                        <td class="shoping__cart__item__close">
                                                            <span class="icon_close" onClick={() => handleRemoveItem(item.id)}></span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </section>
                )
            }
        </div>
    )
}

export default FavouritesSection