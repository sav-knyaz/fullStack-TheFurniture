import { $host, $autHost } from ".";
import jwt_decode from 'jwt-decode';
import axios from "axios";


export const registration = async (email, password, name, role) =>{
    
   const {data} = await axios.post('http://localhost:5040/api/user/registration', {email, password, name, role});
    localStorage.setItem('token', data.token)
    return jwt_decode(data)
};
export const login = async (email, password) =>{
      
        const {data} = await $host.post('http://localhost:5040/api/user/login', {email, password});
     localStorage.setItem('token', data.token)
     return jwt_decode(data)
 };
export const check = async () =>{
    const {data} = await $autHost.get('http://localhost:5040/api/user/login');
    localStorage.setItem('token', data.token);
    return jwt_decode(data)
}
export const getUserName = async (id)=>{
    const {data} = await axios.post('http://localhost:5040/api/user/getOneUser', {id: id})

    return data
}
