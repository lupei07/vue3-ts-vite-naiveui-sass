/*
 * @Author: lu
 * @Date: 2021-11-23 14:25:40
 * @LastEditTime: 2021-12-30 16:15:49
 * @FilePath: \vue-ts-erp\src\main.ts
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import countTo from "vue3-count-to";
import STable from '@surely-vue/table';
// eslint-disable-next-line import/no-unresolved
import GolbalComponent from '@/components/ui/globalRegister'

// 打印
import PrintCaiNiao from '@/utils/print/PrintCaiNiao'
PrintCaiNiao.setUrl('ws://127.0.0.1:13528')


import './assets/css/reset.css'
import '@surely-vue/table/dist/index.css'
// 按需引入
import naive from './ui/index'

const app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.use(naive)
app.use(store);
app.use(countTo);
app.use(STable);
app.use(GolbalComponent)
app.use(PrintCaiNiao);



app.mount('#app')
