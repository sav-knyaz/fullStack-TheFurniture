import axios from 'axios';

const $host = axios.create({
    
     baseURL: 'http://localhost:5040/'

});

const $autHost = axios.create({
    
    baseURL: 'http://localhost:5040/'

});

const authInterceptor = config => {
    
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
};

    $autHost.interceptors.request.use(authInterceptor);

export  {
    $autHost,
    $host
};