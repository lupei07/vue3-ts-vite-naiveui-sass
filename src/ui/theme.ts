/*
 * @Author: lu
 * @Date: 2021-11-23 15:33:40
 * @LastEditTime: 2021-12-07 13:40:07
 * @FilePath: \vue-ts-erp\src\ui\theme.ts
 * @Description: 
 */

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
import { GlobalThemeOverrides } from 'naive-ui'
const themeOverrides: GlobalThemeOverrides = {
    common: {
        fontSize: "13px",
        fontSizeSmall: "13px",
        primaryColor: '#2080F0',
        primaryColorHover: '#4098FC',
        primaryColorPressed: '#1060C9',
        primaryColorSuppl: '#4098FC'
    },
    DataTable: {
        fontSizeSmall: "13px",
        tdPaddingSmall: "5px"
    },
    Pagination: {
        itemPadding: "0 2px",
        itemFontSize: "12px"
    }
}

export default themeOverrides