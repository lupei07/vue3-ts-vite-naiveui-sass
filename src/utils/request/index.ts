/*
 * @Author: lu
 * @Date: 2021-11-24 18:16:47
 * @LastEditTime: 2021-12-29 14:20:39
 * @FilePath: \vue-ts-erp\src\utils\request\index.ts
 * @Description: 封装接口返回 promise对象
 */
import axios from 'axios'
import qs from 'qs'
import VStorage from '@/utils/storage'
import { Method, RequestParams, IrequestParams, ContentType, IRequestResult } from './type'
import { baseUrl } from '../env'
import DuplicateRequest from './duplicate'


/**
 * @description: 封装接口返回 promise对象
 * @param {string} url请求连接
 * @param {Method}  method请求方式
 * @param {RequestParams}  params请求参数
 * @param {config} 
 * @param {boolean} checkQuickClick
 * @param {number} clickInterval
 * @return {Promise} Promise
 */
export default function ajax(obj: IrequestParams): Promise<IRequestResult> {
    let { url, method, data, config, checkQuickClick, clickInterval } = obj;
    let headers: any = {};
    let session = VStorage.getItem('session_id');
    url = baseUrl + url;
    data = data ? data : {};

    headers['Content-Type'] = ContentType.json;
    headers["X-Request-Time"] = (new Date().getTime() / 1000).toFixed(3);
    if (session) {
        headers['SESSION'] = JSON.parse(session);
    }

    config = { headers, ...config }

    // 不允许相同url快速点击
    if (checkQuickClick && DuplicateRequest.hashUrlAndParams(url, method, data, clickInterval)) {
        console.log('click quick');
        return Promise.reject('click quick');
    }

    return new Promise((resolve, reject) => {

        let promise: any
        if (method === Method.GET) {
            url = qs.stringify(data) !== '' ? url + '?' + qs.stringify(data) : url;
            promise = axios.get(url, config)
        }
        if (method === Method.POST) {
            promise = axios.post(url, data, config)
        }

        promise.then((response: any) => {
            resolve(response.data)
        }).catch((err: any) => {
            reject(err)
        })
    })

}