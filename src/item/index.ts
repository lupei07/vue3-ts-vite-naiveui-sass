/*
 * @Author: lu
 * @Date: 2021-11-24 14:38:00
 * @LastEditTime: 2021-12-21 13:59:36
 * @FilePath: \vue-ts-erp\src\item\index.ts
 * @Description: 根据不同的域名展示不同的图片或文字
 */
import wsyPath from './wsy-erp'; // 网商园
import pxPath from './erp' //貔貅兔
const { hostname } = window.location;
let path: object = pxPath;
if (hostname == 'localhost') {
    path = pxPath
} else {
    path = wsyPath
}
export default path;
