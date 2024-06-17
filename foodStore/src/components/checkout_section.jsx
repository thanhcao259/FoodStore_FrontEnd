import React, {useState, useEffect} from "react";
import cartAction from "../api/cartApi";
import addressApi from "../api/addressApi";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import profileApi from "../api/profileApi";
import orderApi from "../api/orderApi";

function CheckoutSection(){
    const [listCartItems, setListCartItems] = useState([]);
    const [listAddress, setListAddress] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [payment, setPayment] = useState(1);

    
    const currentPage = useLocation().pathname;
    const navigate = useNavigate();
    
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        fetchData();
        
    }, []);

    const fetchData = async() => {
        try {
            // debugger
            const response = await cartAction.getAll();
            const data = await addressApi.get();
            const identity = await profileApi.get();
            setListCartItems(response);
            setListAddress(data);
            setUserInfo(identity);
            setAddress(data[0].id);
            let sumPrice = 0;
            response.forEach(item => {
                sumPrice += item.totalPrice;
            });
            setTotalPrice(sumPrice);
        } catch (error) {
            console.log(error);
        }
    };

    
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const handleAddAddress = async(e) => {
        
        try {
            await addressApi.add(newAddress);
            navigate("/check-out");
            toast.success("Create new address success");
            fetchData();
        } catch (error) {
            console.log(error);
            toast.error("Create new address failed");
        }
    };

    const handleSelected = (e) => {
        setAddress(e.target.value);
    };

    const handleSelectedPayment = (e) => {
        setPayment(e.target.value);
    };

    
    const handleOrder = async() => {
        setLoading(true);
        if ( payment === 1) {
            try {
                await orderApi.add(address, userInfo.fullName, userInfo.phone);
                toast.success("Order success");
                navigate("/Home");
            } catch (error) {
                console.log(error);
                toast.error("Order failed");
            }
        } else {
            try {
                const urlVNPay = await orderApi.addOnl(address, userInfo.fullName, userInfo.phone, totalPrice);
                if (urlVNPay) {
                    window.location=urlVNPay;
                }
            } catch (error) {
                console.log(error);
                toast.error("Order failed");
            }
        }
    }
    
    return(
        <div>
            <section className="checkout spad">
                <div className="container">
                    <div class="checkout__form">
                        <h4>Thông tin đơn hàng</h4>
                        <div>
                            <div class="row">
                                <div class="col-lg-8 col-md-6">
                                    <div class="checkout__input">
                                        {
                                            currentPage === "/check-out" ? (
                                                <>
                                                    <p>Địa chỉ<span>*</span></p>
                                                    <select style={{ width: '756px'}} onChange={handleSelected}>
                                                        {
                                                            listAddress && listAddress.map((item) => (
                                                                <option key={item.id} value={item.id}>{item.address}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <Link to="/check-out/create-address"><button className="site-btn" style={{ marginTop: '10px'}}>Thêm địa chỉ mới</button></Link>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Địa chỉ mới<span>*</span></p>
                                                    <input type="text" placeholder="Nhập địa chỉ mới" onChange={(e) => setNewAddress(e.target.value)}/>
                                                    <button className="site-btn" style={{ marginTop: '10px'}} onClick={handleAddAddress} disabled={isLoading}>Tạo địa chỉ mới</button>
                                                </>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="checkout__order" style={{ width: '440px'}}>
                                        <h4>Đơn của bạn</h4>
                                        <div class="checkout__order__products">Sản phẩm <span>Tổng</span></div>
                                        <ul>
                                            {
                                                listCartItems && listCartItems.map((item) => (
                                                    <li>{item.name}<span>{formattedAmount.format(item.totalPrice)}</span></li>
                                                ))
                                            }
                                            
                                        </ul>
                                        
                                        <div class="checkout__order__total">Tổng tiền <span>{formattedAmount.format(totalPrice)}</span></div>
                                        
                                        <div class="checkout__input__checkbox">
                                            <label for="payment">
                                                Thanh toán
                                                <select style={{ marginLeft: '10px', width: '150px'}} onChange={handleSelectedPayment}>
                                                    <option value={1}>Khi nhận hàng</option>
                                                    <option value={2}>Qua VNPAY</option>
                                                </select>
                                            </label>
                                        </div>
                                        <button class="site-btn" onClick={handleOrder} disabled={isLoading}>Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CheckoutSection;