/*
 * @Author: lu
 * @Date: 2021-12-22 16:52:07
 * @LastEditTime: 2021-12-27 10:02:15
 * @FilePath: \vue-ts-erp\src\utils\print\type.ts
 * @Description:
 */

// 打印数据
export interface IPrintData {
    face_sheet_type: number
    express_code: string
    express_name: string
    print_data: string
    recv_name: string
    recv_city: string
    recv_address: string
    recv_country: string
    recv_qv: string
    recv_telephone: string
    recv_phone: string
    package_center_code: string
    package_center_name: string
    shipping_branch_code: string
    shipping_branch_name: string
    short_address: string
    express_sn: string
}

// 快递模板
export interface IExpressTemplate {
    face_sheet_type: number
    express_code: string
    express_name: string
    id: number
    is_default: number
    print_name: string
}

// 根据面单类型，快递公司 构造可用的打印快递模板 {1:{cn:}}
export interface IAvailablePrintTemplates<T> {
    [key: number]: T
}
export interface IExpressPrintTemplates {
    [key: string]: IExpressTemplate
}

// 根据数据面单类型，可用快递模板 构造对应面单对应模板的documents
export interface IPrintTask<IPrintDoc> {
    [key: number]: IPrintDoc
}
export interface IPrintDoc {
    [key: string]: object
}

export interface IEncryptedData {
    encryptedData: string
    signature: string
}

export interface ITaskDocuments<T> {
    documents: T
    preview: Boolean
    previewType?: string
    printer: string
    taskID: string
}