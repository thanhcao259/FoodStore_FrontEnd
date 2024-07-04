import React, { useState, useEffect } from "react";
import listGHN from "../../api/listGHN";
import profileApi from "../../api/profileApi";
import { format } from 'date-fns';

function Province() {
  const [province, setProvinces] = useState([]);
  const [selectProvince, setSelectProvince] = useState("");
  const [district, setDistricts] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState("");
  const [ward, setWards] = useState([]);
  const [selectWard, setSelectWard] = useState("");
  const [shift, setShift] = useState([]);
  const [selectShift, setSelectShift] = useState("");
  const [service, setService] = useState([]);
  const [selectService, setSelecteService] = useState("");
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    fetchProvince();
    fetchShift();
    fetchService();
    fetchInfoCustomers();
  }, []);

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

  const fetchShift = async () => {
    try {
      const response = await listGHN.getShift();
      if (response) {
        const shiftResponse = response.map((item) => ({
          id: item.id,
          title: item.title,
        }));
        setShift(shiftResponse);
        // console.log("List shift",shiftResponse);
      } else {
        console.log("Not found data");
      }
    } catch (err) {
      console.log("Err fetching shift: ", err);
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

  const fetchInfoCustomers = async () => {
    try {
      const infoResponse = await profileApi.get();
      // console.log("info ", infoResponse.username, infoResponse.phone);
      setUsername(infoResponse.username); setPhone(infoResponse.phone);
    } catch (err){
      console.log("Err during get info customer");
    }
  }
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
  const handleShiftChange = (e) => {
    setSelectShift(e.target.value);
  };

  const handleServiceChange = (e) => {
    setSelecteService(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username: ", username);
    console.log("Phone: ", phone);
    
    try {
      const response = await listGHN.createOrder(username, phone, selectProvince, selectDistrict, selectWard);
      console.log("response order: ", response.data);
      const formattedDeliveryTime = format(response.data.expected_delivery_time, 'yyyy MMMM dd HH:mm');
      console.log("Fmt ", formattedDeliveryTime)
      setOrderInfo({
        orderCode: response.data.order_code,
        expectedTime: formattedDeliveryTime,
        totalFee: response.data.total_fee,
      })
      console.log("rsl: ", orderInfo.orderCode)
    // console.log("Province ", selectProvince);
    // console.log("District ", selectDistrict);
    } catch (err) {
      console.log("Err during submit ", err);
    }

  };
  return (
    <div>
      <form method="post" encType="multipart/form-data" onClick={handleSubmit}>
        <select value={selectProvince} onChange={handleProvinceChange}>
          <option value="">-- Chọn Tỉnh/Thành phố --</option>
          {province.map((item) => (
            <option
              key={item.ProvinceID}
              value={item.ProvinceID}
              selected="selected"
            >
              {item.ProvinceName}
            </option>
          ))}
        </select>

        <select value={selectDistrict} onChange={handleDistrictChange}>
          <option value="">-- Chọn Quận/Huyện --</option>
          {district.map((item) => (
            <option
              key={item.DistrictID}
              value={item.DistrictID}
              disabled={!handleProvinceChange}
            >
              {item.DistrictName}
            </option>
          ))}
        </select>

        <select value={selectWard} onChange={handleWardChange}>
          <option value="">-- Chọn Xã/phường --</option>
          {ward.map((item) => (
            <option
              key={item.WardCode}
              value={item.WardCode}
              disabled={!handleDistrictChange}
            >
              {item.WardName}
            </option>
          ))}
        </select>

        <select value={selectShift} onChange={handleShiftChange}>
          <option value=""> --- Chọn ca nhận hàng --- </option>
          {shift.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <select value={selectService} onChange={handleServiceChange}>
          <option value=""> --- Chọn dịch vụ --- </option>
          {service.map((item) => (
            <option key={item.service_id} value={item.service_id}>
              {" "}
              {item.service_id} - {item.short_name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>

      {/* Hiển thị thông tin đơn hàng nếu có */}
      {orderInfo && (
            <div>
                <h3>Thông tin đơn hàng:</h3>
                <p>Mã đơn hàng: {orderInfo.orderCode}</p>
                <p>Thời gian giao hàng dự kiến: {orderInfo.expectedTime}</p>
                <p>Tổng phí: {orderInfo.totalFee}</p>
            </div>
        )}
    </div>
  );
}

export default Province;
