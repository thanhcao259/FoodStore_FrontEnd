import axiosAdmin from "./axiosAdmin";
import axiosClient from "./axiosClient";
import axiosGHN from "./axiosGHN";

const API_PROVINCE = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
const TOKEN = "c5e34783-36b0-11ef-b3e6-26fb3de580b4";
const listGHN = {
    getProvince: async () => {
        try {
            const url = '/master-data/province';
            const response = await axiosGHN.get(url);
            return response.data;
        } catch (error) {
            console.log("Err fetching provinces: ", error);
            return null;
        }
    },
    getDistrict: async (provinceId) => {
        try {
            const url = `/master-data/district`;
            const response = await axiosGHN.post(url, {
                province_id: provinceId
            });
            return response.data;
        } catch (err) {
            console.log("Err fetching district: ", err);
            return null;
        }
    },
    getWard: async (districtId) => {
        try {
            const url = `/master-data/ward`;
            const response = await axiosGHN.post(url, {
                district_id: districtId
            });
            return response.data;
        } catch (err) {
            console.log("Err fetching ward: ", err);
            return null;
        }
    },
    getShift: async () => {
        try {
            const url = `/v2/shift/date`;
            const response = await axiosGHN.get(url);
            return response.data;
        }
        catch (err) {
            console.log("Err fetching shift: ", err);
            return null;
        }
    },
    getTypeService: async () => {
        const url = `/v2/shipping-order/available-services`;
        return axiosGHN.post(url, {
            "shop_id": 192732,
            "from_district": 3695,
            "to_district": 3695
        })
    },
    createOrder: async (name, items, address, province, district, ward) => {
        const url = `v2/shipping-order/create`;
        return axiosGHN.post(url, {
            "payment_type_id": 1,
            "required_note": "CHOXEMHANGKHONGTHU",
            "from_name": "Thực phẩm Ngon",
            "from_phone": "0838528503",
            "from_address": "281 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh, Việt Nam", //fake info
            "from_district_id": 3695,
            "from_ward_code": "90742",
            "from_province_id": 202,

            "cod_amount": 0,
            "content": "Delivery test",
            "weight": 2000,
            "length": 50,
            "width": 50,
            "height": 30,
            "pick_station_id": null,
            "deliver_station_id": null,
            "insurance_value": 0, //500000
            "service_id": 0,
            "service_type_id": 2, // ecommerce delivery
            "coupon": null,
            "pick_shift": [2],

            "to_name": name,
            "to_phone": "0838528503",
            "to_address": address, //fake info 
            "to_province_id": province,
            "to_district_id": district,
            "to_ward_code": ward,
            "items": items,
        })
    }

}

export default listGHN;