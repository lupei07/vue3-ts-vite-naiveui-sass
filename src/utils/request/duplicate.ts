/*
 * @Author: lu
 * @Date: 2021-11-25 15:55:40
 * @LastEditTime: 2021-11-29 11:14:17
 * @FilePath: \vue-ts-erp\src\utils\request\duplicate.ts
 * @Description: 防止不必要的请求
 */
import qs from 'qs'
import { Method, RequestParams } from './type'

/**
 * @description: 
 * @param {static} 静态属性（方法），也称为类属性。使用静态属性无需创建实例
 * @return {*}
 */
export default class DuplicateRequest {
    constructor() { };
    static lastRequestTimeStamp = 0;
    static lastIdentityCode = '';
    /**
     * @description: 验证是否是相同的url点击过快
     * @param {string} url
     * @param {Method} method
     * @param {RequestParams} params
     * @param {number} interval
     * @return {*}
     */
    static hashUrlAndParams(url: string, method: Method, params: RequestParams, interval: number = 10000) {
        let indentityCode = [url, method, qs.stringify(params)].join('&');
        const currentTime = Date.parse(new Date().toString());

        if (DuplicateRequest.lastIdentityCode == indentityCode && currentTime - DuplicateRequest.lastRequestTimeStamp < interval) {
            return true;
        } else {
            DuplicateRequest.lastIdentityCode = indentityCode;
            DuplicateRequest.lastRequestTimeStamp = currentTime;
            return false;
        }
    }

}