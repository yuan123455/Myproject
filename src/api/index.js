import request from "./request";

//此处放接口请求
export const login = data => {
    return request({
        url: '/login',
        method: "post",
        data
    })
};
//文件上传
export const FileUpload = data => {
    return request({
        url: '/upload',
        method: 'post',
        data

    });
}
//文件下载
export const download = data => {
    return request({
        url: `/download?url=${data}`,
        method: 'get',
        responseType: 'blob'
    });
}