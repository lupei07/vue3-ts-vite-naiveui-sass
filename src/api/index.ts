/*
 * @Author: lu
 * @Date: 2021-11-25 14:30:18
 * @LastEditTime: 2021-12-29 10:09:42
 * @FilePath: \vue-ts-erp\src\api\index.ts
 * @Description: 
 */
// 当接口相互有依赖时，利用async await等待返回结果
import ajax from "../utils/request";
// 当接口独立时
import userRequest from '../utils/request/useRequest';
import { Method, RequestParams } from '../utils/request/type'


// 登录
export const reqLogin = (data: RequestParams) => {
    return ajax({ url: '/user/login', method: Method.POST, data, checkQuickClick: true });
};

// 首页
export const reqHeaderData = () => {
    return userRequest({ url: '/index/get-header-data', method: Method.GET, });
};

// 订单
export const reqOrderSearch = (data: RequestParams) => {
    return userRequest({ url: '/v2/order/search', method: Method.GET, data });
};
// 发货单
export const reqinvoiceList = (data: RequestParams) => {
    return userRequest({ url: "/v2/invoice/search", method: Method.GET, data });
};
// 打印模板 模板列表
export const reqTemplateList = (data: RequestParams) => {
    return ajax({ url: '/print-template/all', method: Method.GET, data });
};
// 打印数据
export const reqInvoiceExpressPrint = (data: RequestParams) => {
    return ajax({ url: '/v2/invoice/express-print', method: Method.GET, data });
};

