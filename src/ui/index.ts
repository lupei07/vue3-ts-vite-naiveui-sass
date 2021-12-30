/*
 * @Author: lu
 * @Date: 2021-11-23 15:15:04
 * @LastEditTime: 2021-12-16 16:02:44
 * @FilePath: \vue-ts-erp\src\ui\index.ts
 * @Description: naive ui 按需全局安装组件
 */
import {
    // create naive ui
    create,
    // component
    NButton, NConfigProvider, NGlobalStyle, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NForm, NFormItem, NInput, NIcon, NMessageProvider, NDataTable, NScrollbar, NLayoutSider, NMenu, NPagination, NInputNumber, NGrid, NGridItem, NFormItemGridItem, NSelect, NDatePicker, NBreadcrumb, NBreadcrumbItem, NCollapse, NCollapseItem, NCollapseTransition
} from 'naive-ui'

const naive = create({
    components: [NButton, NConfigProvider, NGlobalStyle, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NForm, NFormItem, NInput, NIcon, NMessageProvider, NDataTable, NScrollbar, NLayoutSider, NMenu, NPagination, NInputNumber, NGrid, NGridItem, NFormItemGridItem, NSelect, NDatePicker, NBreadcrumb, NBreadcrumbItem, NCollapse, NCollapseItem, NCollapseTransition]
})

export default naive;