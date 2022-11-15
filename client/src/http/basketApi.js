import axios from "axios";
import { $autHost, $host } from ".";



export const fetchBasket = async (basketId) =>{
     const {data} = await $host.get(`http://localhost:5040/api/basket/${basketId}`);
     return data
};
export const deleteDeviceToBasket = async (deviceId, basketId) => {
     const {data} = await $autHost.delete('http://localhost:5040/api/basket', {data: {deviceId, basketId}});
      return data;
}
export const deleteDevicesToBasket = async (deviceId, basketId) => {
     const {data} = await $autHost.delete('http://localhost:5040/api/basket/device', {data: {deviceId, basketId}});
      return data;
}