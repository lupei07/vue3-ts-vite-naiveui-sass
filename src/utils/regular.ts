/*
 * @Author: lu
 * @Date: 2021-11-29 13:15:33
 * @LastEditTime: 2021-11-29 13:21:35
 * @FilePath: \vue-ts-erp\src\utils\regular.ts
 * @Description: 正则合集
 */
export const regs = {
    username: /^\w{3,11}$/,
    password: /^[A-Za-z0-9]{6,10}$/, //5到10位的数字或字母
}