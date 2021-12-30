/*
 * @Author: lu
 * @Date: 2021-11-29 14:28:09
 * @LastEditTime: 2021-11-30 09:55:27
 * @FilePath: \vue-ts-erp\src\utils\message.ts
 * @Description: 
 */
const defaultDuration = 3000;
export default {
    success(msg: string, duration: number = defaultDuration) {
        window.$message.success(msg, { duration })
    },
    error(msg: string, duration: number = defaultDuration) {
        window.$message.error(msg, { duration })
    }
}