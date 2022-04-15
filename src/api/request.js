import axios from "axios";
import { Message } from "element-ui";
//创建request对象
var request = axios.create({
    baseURL: '/api/bk',//请求基本路径
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

//请求拦截器
request.interceptors.request.use(config => {
    return config
}, err => {
    Promise.reject(err)
})
//响应拦截器
request.interceptors.response.use(res => {
    //处理返回数据
    if (res.data.status == '200') {
        return res.data;
    } else if (res.data.status == '500') {

    }
    Message.error(res.data.message);
    return res.data;
})
export default request;