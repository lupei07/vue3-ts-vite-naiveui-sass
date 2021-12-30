/*
 * @Author: lu
 * @Date: 2021-12-21 14:05:02
 * @LastEditTime: 2021-12-27 18:05:05
 * @FilePath: \vue-ts-erp\src\components\ui\globalRegister.ts
 * @Description: 全局注册组件
 */
import DataTable from "./dataTable/Index.vue";
import Pageination from './pagination/Index.vue'
import WButton from './button/Index.vue'
import Inoicons from './icon/Index.vue'

export default {
    install(Vue: any) {
        Vue.component('DataTable', DataTable)
        Vue.component('Pageination', Pageination)
        Vue.component('WButton', WButton)
        Vue.component('Inoicons', Inoicons)
    }
}
