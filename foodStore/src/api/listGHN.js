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
    getDistrict: async(provinceId) => {
        try{
            const url = `/master-data/district`;
            const response = await axiosGHN.post(url, {
                province_id: provinceId
            });
            return response.data;
        } catch (err){
            console.log("Err fetching district: ", err);
            return null;
        }
    },
    getWard: async(districtId) => {
        try{
            const url = `/master-data/ward`;
            const response = await axiosGHN.post(url, {
                district_id: districtId
            });
            return response.data;
        } catch (err){
            console.log("Err fetching ward: ", err);
            return null;
        }
    },
    getShift: async() =>  {
        try{
            const url = `/v2/shift/date`;
            const response = await axiosGHN.get(url);
            return response.data;
        }
        catch (err){
            console.log("Err fetching shift: ", err);
            return null;
        }
    },
    getTypeService: async(toDistrict) => {
        const url = `v2/shipping-order/available-services`;
        return axiosGHN.post(url, {
            "shop_id": 4314321,
            // "from_district": fromDistrict,
            // "to_district": toDistrict,
            "from_district": 3440,
            "to_district": 1462
        })
    }

}

export default listGHN;