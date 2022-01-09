import axios from "axios";

//创建request对象
var request = axios.create({
    baseURL:'api',//请求基本路径
    timeout:30000,
});

//请求拦截器
request.interceptors.request.use(config => {
    return config
},err => {
    Promise.reject(err)
})
//响应拦截器
request.interceptors.response.use(res => {
    //处理返回数据
    if(res.data.code == '200'){
        return res.data;
    }else if(res.code == '500'){
        
    }else{
        
    }
})
export default request;