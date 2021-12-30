/*
 * @Author: lu
 * @Date: 2021-12-06 10:37:27
 * @LastEditTime: 2021-12-06 15:36:42
 * @FilePath: \vue-ts-erp\src\utils\request\useRequest.ts
 * @Description: 再次封装将promise对象解构返回
 */
import { ref } from 'vue'
import ajax from './index'
import { IrequestParams, IRequestResult } from './type'

export default function userRequest(data: IrequestParams) {
    const loading = ref(false);
    const result = ref<any>(null);
    const errorMsg = ref()
    ajax(data).then((res: IRequestResult) => {
        loading.value = true;
        result.value = res.data;
    }).catch((err: IRequestResult) => {
        loading.value = false;
        errorMsg.value = err.message
    })
    return {
        loading, result, errorMsg
    }
}

// using
/*
    const { loading, result, errorMsg } = reqHeaderData();
    watch(result, () => {
      if (result.value) {
        console.log(loading.value, result.value, errorMsg.value);
      }
    });
 */