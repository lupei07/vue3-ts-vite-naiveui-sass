<!--
 * @Author: lu
 * @Date: 2021-11-23 14:25:40
 * @LastEditTime: 2021-12-30 16:42:50
 * @FilePath: \vue-ts-erp\README.md
 * @Description: 
-->
# Vue 3 + Typescript + Vite + Naive UI + SASS

This template should help get you started developing with Vue 3 and Typescript in Vite.

# 启动项目    `yarn dev`

# 集成
    ## 项目主题变更（根据域名）
    ## 接口封装
    ## 样式封装
    ## 全局注册组件
    ## Naive UI 中 icon封装
    ## 快递单打印
    ## 数据可视化（echarts）
    ## 复制功能

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"
