import request from "./request";

//此处放接口请求
export const  treeList = data => {
   return  request({
        url:'/treeList',
        method:"post",
        data
    })
};