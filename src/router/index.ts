/*
 * @Author: lu
 * @Date: 2021-11-23 14:59:11
 * @LastEditTime: 2021-12-30 13:44:39
 * @FilePath: \vue-ts-erp\src\router\index.ts
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: { keepAlive: false }
    },
    {
        path: '/manage',
        name: 'manage',
        component: () => import('../views/Manage.vue'),
        children: [
            {
                path: 'home',
                name: '首页',
                component: () => import('../views/home/Home.vue'),
                meta: { keepAlive: false }
            },
            {
                path: 'order-list',
                name: '订单查询',
                component: () => import('../views/order/OrderList.vue'),
                meta: { keepAlive: true }
            },
            {
                path: 'order-process',
                name: '订单处理',
                component: () => import(/* webpackChunkName: 'OrderProcess' */'../views/order/OrderProcess.vue'),
                meta: { keepAlive: false },
                props: { a: 1, b: 2 }
            },
            {
                path: 'invoice-list',
                name: '发货单',
                component: () => import(/* webpackChunkName: 'InvoiceList' */ '../views/warehouse/InvoiceList.vue'),
                meta: { keepAlive: false }
            }
        ]
    }
]
const router = createRouter({
    history,
    routes
})
export default router