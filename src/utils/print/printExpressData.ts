/*
 * @Author: lu
 * @Date: 2021-12-22 14:52:38
 * @LastEditTime: 2021-12-27 14:36:08
 * @FilePath: \vue-ts-erp\src\utils\print\printExpressData.ts
 * @Description: 构造各个打印客户端需要的数据结构
 */

import { reqTemplateList, reqInvoiceExpressPrint } from '@/api/index'
import { IExpressTemplate, IPrintData, IAvailablePrintTemplates, IExpressPrintTemplates, IPrintTask, IPrintDoc } from './type'
import { PrintDocument as PrintDocumentCN, PrintTask as PrintTaskCN } from './printCaiNiao'
import VStorage from "@/utils/storage";
import { baseUrl } from '@/utils/env'
import store from '@/store/index'

const express_print = function () {
    /**
     * @description: 获取所有的快递模板
     * @param {type} 
     * @return: Array[]
     */
    async function getTemplates() {
        const { data, status } = await reqTemplateList({});
        console.debug('getTemplates', data)
        if (status == 200) {
            return data as [];
        }
    }

    /**
     * @description: 获取打印数据
     * @param {string} ids 发货单ids 
     * @return: {1:{QR-488 LABEL:{task:{}}},2:{QR-488 LABEL:{task:{}}}}
     */
    async function getPrintList(ids: string) {
        let templateList = await getTemplates();
        const { data, status } = await reqInvoiceExpressPrint({ ids })
        console.debug('getPrintList', data)
        if (status == 200) {
            const availableTemplate = getAvailableTemplate(data as [], templateList as [])
            const { printDocuments, invalidTemplates } = setPrintTask(data as [], availableTemplate)
            if (invalidTemplates.length > 0) {
                console.log('存在没有快递模板的数据');
            }
            return printDocuments
        }
    }

    /**
     * @description: 根据打印数据查询可用快递模板
     * @param {Array} data 接口返回的打印数据
     * @param {Array} templateList 接口返回的所有打印模板
     * @return: {1:{'YUNDA':{对应打印模板}},2:{'ZTO':{对应打印模板}}}
     */
    function getAvailableTemplate(data: [], templateList: []) {
        let availablePrintTemplates: IAvailablePrintTemplates<IExpressPrintTemplates> = {}
        data.forEach((item: IPrintData) => {
            // 可能存在多个对应的模板
            let availableTemplates = templateList.filter((temp: IExpressTemplate) => temp.face_sheet_type == item.face_sheet_type && temp.express_name.toUpperCase() == item.express_code.toUpperCase())
            if (availableTemplates.length > 0) {
                let availableTemplate: IExpressTemplate[] = [];
                // 判断是否有默认模板
                let defaultTemplate = availableTemplates.filter((item: IExpressTemplate) => item.is_default == 1)
                if (defaultTemplate.length) {
                    availableTemplate = defaultTemplate
                } else {
                    // 如果没有默认模板  默认第一个
                    availableTemplate = availableTemplates.slice(0, 1)
                }
                if (availablePrintTemplates[item.face_sheet_type] === undefined) {
                    availablePrintTemplates[item.face_sheet_type] = {};
                }
                availablePrintTemplates[item.face_sheet_type][item.express_code] = availableTemplate[0];
            }

        })
        return availablePrintTemplates;
    }

    /**
     * @description: 根据打印模板查询快递公司对应模板url
     * @param {String} expressCode 接口返回打印数据的快递公司code
     * @param {number} fst 面单类型
     * @return: url
     */
    function getMainTemplateUrl(expressCode: string, fst: number) {
        return 'http://cloudprint.cainiao.com/template/standard/101/123'
    }
    /**
     * @description: 根据打印模板获取自定义区域模板url
     * @param {number} id 接口返回的打印模板的id
     * @param {number} fst 面单类型
     * @return: url
     */
    function getCustomerTemplateUrl(id: number, fst: number): string {
        const _login = JSON.parse(VStorage.getItem("login"));
        let templateUrl = `${baseUrl}/print-template/xml?id=${id}&master_id=${_login.parent_id}&preview=0&t=` + (new Date().getTime());
        return templateUrl
    }

    /**
     * @description: 根据面单类型,打印机分组打印数据
     * @param {Array} data 接口返回的打印数据
     * @param {Object} data 重组的可用打印模板
     * @return:  {1:{QR-488 LABEL:{task:{}}},2:{QR-488 LABEL:{task:{}}}}
     */
    function setPrintTask(data: [], availableTemplate: IAvailablePrintTemplates<IExpressPrintTemplates>) {
        const invalidTemplates: any[] = [];
        const printDocuments: IPrintTask<IPrintDoc> = {}
        data.forEach((item: IPrintData) => {
            const faceSheetType = item.face_sheet_type;
            const expressCode = item.express_code
            const expressName = item.express_name;
            if (!availableTemplate[faceSheetType] || !availableTemplate[faceSheetType][expressCode]) {
                console.log('没有可用的打印模板');
                invalidTemplates.push({
                    face_sheet_type: faceSheetType,
                    express_name: expressName,
                    express_code: expressCode
                })
                return;
            }
            let printTemplate: IExpressTemplate = availableTemplate[faceSheetType][expressCode]
            const document: any = setPrintData(item, printTemplate)
            if (!printDocuments[faceSheetType]) {
                printDocuments[faceSheetType] = {}
            }
            if (!printDocuments[faceSheetType][printTemplate.print_name]) {
                let task!: PrintTaskCN;
                if (faceSheetType == 1) {
                    task = new PrintTaskCN();
                } else if (faceSheetType == 3) {
                    task = new PrintTaskCN();
                }
                task.setPrinter(printTemplate.print_name)
                printDocuments[faceSheetType][printTemplate.print_name] = task
            }
            // 其实是对应实例task里面的方法
            (printDocuments[faceSheetType][printTemplate.print_name] as PrintTaskCN).addDocument(document)
        })
        return { printDocuments, invalidTemplates }
    }

    /**
     * @description: 重组客户端所需要的数据结构
     * @param {Object} printDocument 单条数据
     * @param {Object} printTemplate 数据对应的模板
     * @return: 
     */
    function setPrintData(printDocument: IPrintData, printTemplate: IExpressTemplate) {
        const fst = printDocument.face_sheet_type
        // 自定义模板地址
        const customerTemplateUrl = getCustomerTemplateUrl(printTemplate.id, fst)
        // 快递模板地址
        const mainTemplateUrl = getMainTemplateUrl(printTemplate.express_code, fst)

        // 构造打印数据
        let document: PrintDocumentCN = new PrintDocumentCN();
        if (fst == 1) {
            // 菜鸟
            document.setCustomTemplateUrl(customerTemplateUrl)
            document.setMainTemplateUrl(mainTemplateUrl)
            document.setWaybillCode(printDocument.express_sn)
            document.setCustomAreaData(printDocument)
            let isEncrypted = printDocument.print_data.length > 0 ? true : false;
            if (isEncrypted) {
                // 密文
                const data = JSON.parse(printDocument.print_data)
                document.setEncryptedData(data)
            } else {
                document.setRecipient(printDocument)
                document.setSender(printDocument)
                document.setRoutingInfo(printDocument)
            }

        } else if (fst == 3) {
            console.log('faceSheetType', fst)
        }
        return document.toJson()
    }

    /**
     * @description: 打印
     * @param {Object} printDocuments 根据面单类型,打印机分组打印数据
     * @return: 
     */
    function printOk(printDocuments: IPrintTask<IPrintDoc>) {
        console.log(printDocuments)
        for (let fst in printDocuments) {
            if (Number(fst) == 1) {
                // CAINIAO
                const printers = printDocuments[fst]
                let task!: PrintTaskCN;
                for (let printer in printers) {
                    task = printers[printer] as PrintTaskCN
                    const requestHeader = task.setRequestHeader();
                    store.state.print.cn.sendRequest({ ...requestHeader, ...task })
                }

            }
        }
    }

    /**
     * @description: 预览
     * @param {Object} printDocuments 根据面单类型,打印机分组打印数据
     * @param {string} previewType 预览类型 pdf image
     * @return: string
     */
    async function printPreview(printDocuments: IPrintTask<IPrintDoc>, previewType: string = 'pdf') {
        const previewURL = await finalPrintData(printDocuments, true, previewType)
        return previewURL
    }

    /**
     * @description: 最终发送的打印数据
     * @param {Object} printDocuments 根据面单类型,打印机分组打印数据
     * @param {boolean} preview 是否预览
     * @param {string} previewType 预览类型 pdf image
     * @return: 
     */
    function finalPrintData(printDocuments: IPrintTask<IPrintDoc>, preview: boolean = false, previewType: string) {
        return new Promise(async (resolve, reject) => {
            for (let fst in printDocuments) {
                if (Number(fst) == 1) {
                    // CAINIAO
                    const printers = printDocuments[fst]
                    let task!: PrintTaskCN;
                    for (let printer in printers) {
                        task = printers[printer] as PrintTaskCN
                        const requestHeader = task.setRequestHeader();
                        if (preview) {
                            task.setPreview(previewType);
                        }
                        const res = await store.state.print.cn.sendRequest({ ...requestHeader, ...task })
                        if (res.status == "success") {
                            if (preview) {
                                // 预览成功
                                if (previewType == 'pdf') {
                                    resolve(res.previewURL)
                                } else {
                                    resolve(res.previewImage)
                                }
                            } else {
                                // 打印成功
                                resolve(true)
                            }
                        } else {
                            if (preview) {
                                reject('Preview failed')
                            } else {
                                reject('Print failed')
                            }

                        }
                    }
                }
            }
        })
    }


    return { templateList: getTemplates, printList: getPrintList, printPreview, printOk }
}()

export default express_print

