/*
 * @Author: lu
 * @Date: 2021-11-29 10:50:56
 * @LastEditTime: 2021-12-06 14:24:08
 * @FilePath: \vue-ts-erp\src\utils\request\type.ts
 * @Description: 
 */

export enum ContentType {
    form = 'application/x-www-form-urlencoded',
    json = 'application/json; charset=utf-8',
    multipart = 'multipart/form-data',
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}


/**
 * api/index.ts请求参数
 */
export interface IrequestParams {
    url: string;
    method: Method;
    data?: RequestParams;
    config?: object;
    checkQuickClick?: boolean; // 是否开启快速点击事件
    clickInterval?: number; // (点击间隔时间)
}

/**
 * 网络请求参数
 */
export interface RequestParams {
    [key: string]: any;
}

/* 
* 接口返回结果
*/
export interface IRequestResult {
    status: number,
    data: object | [],
    message?: string
}
