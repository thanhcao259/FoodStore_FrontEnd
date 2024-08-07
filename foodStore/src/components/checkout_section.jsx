import React, { useState, useEffect } from "react";
import cartAction from "../api/cartApi";
import addressApi from "../api/addressApi";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import profileApi from "../api/profileApi";
import orderApi from "../api/orderApi";
import listGHN from "../api/listGHN";
import { format } from "date-fns";

function CheckoutSection() {
  const [listCartItems, setListCartItems] = useState([]);
  const [listAddress, setListAddress] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [payment, setPayment] = useState(1);

  const [province, setProvinces] = useState([]);
  const [selectProvince, setSelectProvince] = useState("");
  const [district, setDistricts] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState("");
  const [ward, setWards] = useState([]);
  const [selectWard, setSelectWard] = useState("");
  const [service, setService] = useState([]);
  const [selectService, setSelecteService] = useState("");
  const [orderInfo, setOrderInfo] = useState([]);
  const [vat, setVAT] = useState('');
  const [addressName, setAddresName] = useState("");

  const currentPage = useLocation().pathname;
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
    fetchProvince();
    fetchService();
  }, []);

  useEffect(()=>{
  }, [totalPrice]);

  const fetchData = async () => {
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
      response.forEach((item) => {
        sumPrice += item.totalPrice;
      });
      const vat = sumPrice*0.08;
      setTotalPrice(sumPrice);
      setVAT(vat);
      // fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProvince = async () => {
    try {
      const response = await listGHN.getProvince();
      // console.log("API responses: ", response);
      if (response) {
        const provinceList = response.map((item) => ({
          ProvinceID: item.ProvinceID,
          ProvinceName: item.ProvinceName,
        }));
        setProvinces(provinceList);
        // console.log("Province ", provinceList);
      } else {
        console.log(" No data found!!!");
      }
    } catch (e) {
      console.log("Err: ", e);
    }
  };

  const fetchDistrict = async (province_id) => {
    try {
      province_id = Number(province_id);
      const response = await listGHN.getDistrict(province_id);
      if (response) {
        const districtList = response.map((item) => ({
          DistrictID: item.DistrictID,
          DistrictName: item.DistrictName,
        }));
        setDistricts(districtList);
        // console.log("Distric: ", districtList);
      } else {
        console.log("Not found district");
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  const fetchWard = async (district_id) => {
    try {
      district_id = Number(district_id);
      const response = await listGHN.getWard(district_id);
      if (response) {
        const wardList = response.map((item) => ({
          WardCode: item.WardCode,
          WardName: item.WardName,
        }));
        setWards(wardList);
        // console.log("Ward: ", wardList);
      } else {
        console.log("Not found ward");
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  const fetchService = async () => {
    try {
      // fromDistric = Number(fromDistric);
      // toDistrict = Number(toDistrict);
      const response = await listGHN.getTypeService();
      if (response) {
        const list = response.data.map((item) => ({
          service_id: item.service_id,
          short_name: item.short_name,
          service_type_id: item.service_type_id,
        }));
        setService(list);
        // console.log("Service: ", list);
      } else {
        console.log("Not found ward");
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  const listData = listCartItems.map((item) => ({
    name: item.name,
    code: item.productIdentity,
    quantity: item.quantity,
    price: item.totalPrice, 
    image: item.urlImage,
    length: 50, // Giả sử bạn có chiều dài của sản phẩm
    width: 50, // Giả sử bạn có chiều rộng của sản phẩm
    height: 50, // Giả sử bạn có chiều cao của sản phẩm
    weight: 50, // Giả sử bạn có trọng lượng của sản phẩm
    category: {
      level1: item.category
    }
  }));

  // setItems(listData);
  // console.log("cart items1: ", listData);


  // const fetchItems = async()=>{
  //   try{
  //     console.log("start fetch items");
  //     if(listCartItems.length > 0){
  //       const listData = listCartItems.map((item) => ({
  //         name: item.name,
  //         code: item.productIdentity,
  //         quantity: item.quantity,
  //         price: item.totalPrice, 
  //         image: item.urlImage,
  //         length: 50, // Giả sử bạn có chiều dài của sản phẩm
  //         width: 50, // Giả sử bạn có chiều rộng của sản phẩm
  //         height: 50, // Giả sử bạn có chiều cao của sản phẩm
  //         weight: 50, // Giả sử bạn có trọng lượng của sản phẩm
  //         category: {
  //           level1: item.category
  //         }
  //       })) 
  //       setItems(listData);
  //       console.log("cart items: ", listData);
  //     } else { console.log("Not found list item");}
  //   } catch (err){
  //     console.log("Err fetching cart items: ", err);
  //   }
  // };
  
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleAddAddress = async (e) => {
    e.preventDefault();
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

  const handleSelectedAddress = async (e) => {
    const addrId = e.target.value;
    setAddress(addrId);
    const response = await addressApi.getById(addrId);
    // console.log("address ", response);
    setAddresName(response);
  };

  console.log("add name1", addressName);


  const handleSelectedPayment = (e) => {
    console.log('payment', e.target.value);
    setPayment(e.target.value);
  };

  const handleOrder = async () => {
    setLoading(true);
    // debugger
    if (payment === 1) { //pay by cash
      try {
        console.log("payment ", payment);
        await orderApi.add(address, userInfo.username, userInfo.phone);
        toast.success("Order success");
        navigate("/Home");
      } catch (error) {
        console.log(error);
        toast.error("Order failed");
      }
    } 
    else { //VnPay
      try {
        console.log("payment ", payment);
        let finalPrice = totalPrice + vat;
        if(orderInfo.totalFee && orderInfo.totalFee>0){
          finalPrice += orderInfo.totalFee;
          // setTotalPrice(totalPrice+vat+orderInfo.totalFee);
        } 
        // console.log("total after: ", finalPrice);
        const urlVNPay = await orderApi.addOnl(
          address, userInfo.fullName, userInfo.phone, totalPrice, vat, orderInfo.totalFee
        );

        if (urlVNPay) {
          window.location = urlVNPay;
        }
      } catch (error) {
        console.log(error);
        toast.error("Order failed");
      }
    }
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectProvince(provinceId);
    setSelectDistrict("");
    fetchDistrict(provinceId);
  };
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectDistrict(districtId);
    setSelectWard("");
    fetchWard(districtId);
  };
  const handleWardChange = (e) => {
    setSelectWard(e.target.value);
  };
  const handleServiceChange = (e) => {
    setSelecteService(e.target.value);
  };
  const handleGHN = async (e) => {
    e.preventDefault();
    const username = userInfo.username;
    console.log("username", username);
    try {
      const response = await listGHN.createOrder( userInfo.username, listData, addressName, selectProvince, selectDistrict, selectWard);
      if(response.data.total_fee > 40000){
        response.data.total_fee = 40000
      }
      console.log("response order: ", response.data);
      const formattedDeliveryTime = format( response.data.expected_delivery_time,"yyyy MMMM dd HH:mm");
      console.log("Fmt ", formattedDeliveryTime);
      setOrderInfo({
          orderCode: response.data.order_code,
          expectedTime: formattedDeliveryTime,
          totalFee: response.data.total_fee,
    });
      // console.log("Province ", selectProvince);
      // console.log("District ", selectDistrict);
    } catch (err) {
      console.log("Err during submit ", err);
    }
  };

  return (
    <div>
      <section className="checkout spad">
        <div className="container">
          <div class="checkout__form">
            <h4>Thông tin đơn hàng</h4>
            <div>
              <div class="row">
                <div class="col-lg-8 col-md-6">
                  <div class="checkout__input">
                    {/* {currentPage === "/check-out" ? (
                      <>
                        <p> Địa chỉ<span>*</span> </p>
                        <select style={{ width: "756px" }}  onChange={handleSelectedAddress}>
                          {listAddress.length > 0  &&
                            listAddress.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.address}
                              </option>
                            ))}
                        </select>
                        <Link to="/check-out/create-address">
                          <button className="site-btn" style={{ marginTop: "10px" }}>
                            Thêm địa chỉ mới
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <p>
                          Địa chỉ mới<span>*</span>
                        </p>
                        <input
                          type="text"
                          placeholder="Nhập địa chỉ mới"
                          onChange={(e) => setNewAddress(e.target.value)}
                        />
                        <button className="site-btn" style={{ marginTop: "10px" }}
                          onClick={handleAddAddress}  disabled={isLoading} >
                          Tạo địa chỉ mới
                        </button>
                      </>
                    )} */}
                  </div>

                  <form className="form-container"  method="post" encType="multipart/form-data">
                    <h2>Thông tin giao hàng</h2>
                    <div className="form-group">
                    {currentPage === "/check-out" ? (
                        <>
                          <label>Địa chỉ:</label>
                          <select className="form-control"  onChange={handleSelectedAddress}>
                          <option value="">-- Chọn địa chỉ nhận --</option>
                            {listAddress.length > 0  &&
                              listAddress.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.address}
                                </option>
                              ))}
                          </select>
                          <Link to="/check-out/create-address">
                            <button className="btn-submit" style={{ marginTop: "10px" }}>
                              Thêm địa chỉ mới
                            </button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <label>Địa chỉ mới</label>
                          <input className="form-control" type="text" placeholder="Nhập địa chỉ mới"
                            onChange={(e) => setNewAddress(e.target.value)}
                          />
                          <button className="btn-submit" style={{ marginTop: "10px" }}
                            onClick={handleAddAddress}  disabled={isLoading} >
                            Tạo địa chỉ mới
                          </button>
                        </>
                      )}
                      </div>
                      <div className="form-group">
                        <label>Tỉnh/Thành phố:</label>
                        <select className="form-control" value={selectProvince} onChange={handleProvinceChange} >
                          <option value="">-- Chọn Tỉnh/Thành phố --</option>
                          {province.map((item) => (
                            <option key={item.ProvinceID} value={item.ProvinceID} selected="selected">
                              {item.ProvinceName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                      <label>Quận/Huyện:</label>
                      <select className="form-control" value={selectDistrict} onChange={handleDistrictChange}>
                        <option value="">-- Chọn Quận/Huyện --</option>
                        {district.map((item) => (
                          <option key={item.DistrictID} value={item.DistrictID} disabled={!handleProvinceChange}>
                            {item.DistrictName}
                          </option>
                        ))}
                      </select>
                      </div>
                      <div className="form-group">
                      <label>Xã/phường:</label>
                      <select className="form-control" value={selectWard} onChange={handleWardChange}>
                        <option value="">-- Chọn Xã/phường --</option>
                        {ward.map((item) => (
                          <option key={item.WardCode} value={item.WardCode}
                            disabled={!handleDistrictChange} >
                            {item.WardName}
                          </option>
                        ))}
                      </select>
                      </div>
                      <div className="form-group">
                      <label>Dịch vụ:</label>
                      <select className="form-control" value={selectService} onChange={handleServiceChange}>
                        <option value=""> --- Chọn dịch vụ --- </option>
                        {service.map((item) => (
                          <option key={item.service_id} value={item.service_id}>
                            {" "}
                            {item.service_id} - {item.short_name}
                          </option>
                        ))}
                      </select>
                      </div>
                      <button className="btn-submit" type="submit" onClick={handleGHN}>Giao hàng</button>
                  </form>
                </div>

                <div class="col-lg-4 col-md-6">
                  <div class="checkout__order" style={{ width: "440px" }}>
                    <h4>Đơn của bạn</h4>
                    <div class="checkout__order__products">
                      Sản phẩm <span>Tổng</span>
                    </div>
                    <ul>
                      {listCartItems &&
                        listCartItems.map((item) => (
                          <li>
                            {item.name}
                            <span> {formattedAmount.format(item.totalPrice)} </span>
                          </li>
                        ))}
                    </ul>

                    <div class="checkout__order__total">
                      Tổng {" "}
                      <span>{formattedAmount.format(totalPrice)}</span>
                    </div>
                    <div class="checkout__order__total">
                      VAT{" "}
                      <span>{formattedAmount.format(vat)}</span>
                    </div>
                    <div class="checkout__order__total">
                      Phí vận chuyển{" "}
                      {orderInfo.totalFee ? (<span>{formattedAmount.format(orderInfo.totalFee)}</span>)
                        :(<span>{formattedAmount.format(0)}</span>)}
                      
                    </div>

                    <div class="checkout__order__total">
                      Tổng hóa đơn{" "}
                      {orderInfo.totalFee ? (<span>{formattedAmount.format(totalPrice + orderInfo.totalFee+vat)}</span>) 
                        : (<span>{formattedAmount.format(totalPrice + vat)}</span>)}
                      
                    </div>

                    <div class="checkout__order__total">
                      Dự kiến giao{" "}
                      <span>{orderInfo.expectedTime}</span>
                    </div>

                    <div class="checkout__input__checkbox">
                      <label for="payment">
                        Thanh toán
                        <select
                          style={{ marginLeft: "10px", width: "150px" }}
                          onChange={handleSelectedPayment} >
                          <option value={1}>Khi nhận hàng</option>
                          <option value={2}>Qua VNPAY</option>
                        </select>
                      </label>
                    </div>
                    <button class="site-btn" onClick={handleOrder} disabled={isLoading} >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckoutSection;
