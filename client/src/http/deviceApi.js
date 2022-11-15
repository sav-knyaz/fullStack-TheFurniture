import axios from "axios";
import { $autHost, $host } from "./index";




export const creatDevice = async (formData) =>{
      const {data} = await axios.post('http://localhost:5040/api/device', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
     return data
};
export const searchDevice = async (deviceName)=>{
    const {data} = await axios.get(`http://localhost:5040/api/device/search/${deviceName}`)

    return data
}
export const fetchDevices = async () =>{
    const {data} = await $host.get(`http://localhost:5040/api/device`);
    return data
};
export const fetchCommitDevice = async (text, deviceId, userId) =>{
    const {data} = await $host.post('http://localhost:5040/api/device/newCommit', {text, deviceId, userId});
    return data
};
export const fetchOneDevice = async (id) =>{
    const {data} = await $host.get(`http://localhost:5040/api/device/${id}`);
    return data
};

export const deleteDevice = async (id, img) =>{
    const {data} = await $autHost.delete('http://localhost:5040/api/device/', {data: {id: id, img: img}});
    return data
};

export const rateDevice = async (rate, deviceId, userId) =>{
    const {data} = await $autHost.post('http://localhost:5040/api/device/rate', {rate, deviceId, userId})
    return data
};

export const changesDevice = async (formData) =>{
    const {data} = await $autHost.post('http://localhost:5040/api/device/changes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
    return data
};

export const changesImagesDevice = async (formData) =>{
    const {data} = await $autHost.post('http://localhost:5040/api/device/changesImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
    return data
};

export const pushToCartDevice = async (deviceId, basketId) =>{
    const {data} = await $autHost.post(`http://localhost:5040/api/device/addDevice`, {deviceId, basketId});
    return data
};

export const fetchType = async () =>{
    const {data} = await $host.get('http://localhost:5040/api/type');
    return data
};

export const createType = async (name) =>{
    const {data} = await $autHost.post('http://localhost:5040/api/type', {name: name});
    return data
};

export const deleteType = async (name) =>{
    const {data} = await $autHost.delete('http://localhost:5040/api/type', { data: {name: name}});
    return data
};

export const changesType = async (name) =>{
    const {data} = await $autHost.post('http://localhost:5040/api/type/chenges', {name: name});
    return data
};