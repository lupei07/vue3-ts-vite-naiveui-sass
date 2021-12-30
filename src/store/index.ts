/*
 * @Author: lu
 * @Date: 2021-11-24 14:57:19
 * @LastEditTime: 2021-12-22 11:40:04
 * @FilePath: \vue-ts-erp\src\store\index.ts
 * @Description: 
 */
import { Store, createStore } from "vuex";
import path from '../item/index'

// 配置vue+ts的项目中使用vuex
declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        path: object;
    }
    // provide typeing for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<Store<any>>;
    }
}

const store = createStore({
    state() {
        return {
            path: path,  // 主题图片
            print: {} // 不同客户端打印对象
        };
    },
    mutations: {
        //方法
        incCount(state: any) {
            state.count++;
        },
        setPrint(state: any, obj: any) {
            state.print[obj.key] = obj.value
        }
    },
    getters: {},
    actions: {},
    modules: {}
});

export default store;