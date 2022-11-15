import { deleteDeviceToBasket, deleteDevicesToBasket } from "../http/basketApi";
import { pushToCartDevice } from "../http/deviceApi";



export function addToCart (deviceId, basketId){
    
    pushToCartDevice(deviceId, basketId).then(res => {console.log(res)});

    
}

export function deleteToCart(deviceId, basketId){
    deleteDeviceToBasket(deviceId, basketId).then(res => console.log(res))
}

export function deleteToCartDevice(deviceId, basketId){
    deleteDevicesToBasket(deviceId, basketId).then(res => console.log(res))
}