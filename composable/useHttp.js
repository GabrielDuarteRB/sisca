import axios from 'axios'

const useHttp = axios.create({
    baseURL: '/api/',
    'Content-Type': 'application/json'
})

useHttp.defaults.crossDomain = true;
useHttp.defaults.withCredentials = true;
useHttp.defaults.mode = 'no-cors';
useHttp.defaults.headers.common.Accept = 'application/json'

export default useHttp;