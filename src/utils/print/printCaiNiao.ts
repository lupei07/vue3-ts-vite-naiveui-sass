/*
 * @Author: lu
 * @Date: 2021-12-21 15:41:14
 * @LastEditTime: 2021-12-27 14:44:50
 * @FilePath: \vue-ts-erp\src\utils\print\printCaiNiao.ts
 * @Description:
 */
import { IWSClient, WSClient, STATE, TOOLS } from './websocket'
import store from "@/store/index";
import { IEncryptedData, IPrintData, ITaskDocuments } from './type'


class PrintCaiNiao {
    _ws!: IWSClient
    _wsUrl!: string

    constructor() { }

    install() {
        store.commit('setPrint', { key: "cn", value: this })
        this._ws = new WSClient(this._wsUrl);
        this._ws.contect()
    }

    setUrl(url: string) {
        this._wsUrl = url
    }

    //  向webSocket服务器发送数据
    send(context: object): any {
        return this._ws.send(context);
    }

    sendRequest(data: object) {
        // 连接成功
        return new Promise(async (resolve, reject) => {
            if (this._ws._state == STATE.OPEN) {
                let resp = await this.send(data);
                resolve(resp) // 响应数据
            } else {
                reject(new Error('connect failed'))
            }
        })

    }
}

export default new PrintCaiNiao()

export class PrintDocument {
    mainTemplateUrl!: string
    customTemplateUrl!: string
    customAreaData!: object
    recipient!: object //收件人
    sender!: object //发件人
    routingInfo!: object // 路由信息
    encryptedData!: object // 密文
    waybillCode!: string //面单号


    setMainTemplateUrl(url: string) {
        this.mainTemplateUrl = url
    }

    // 收件人
    setRecipient(data: IPrintData) {
        this.recipient = {
            "address": {
                "city": data.recv_city,   //市
                "detail": data.recv_address, //详细地址
                "district": data.recv_name,   //区
                "province": data.recv_country,   //省
                "town": ''    //镇
            },
            "mobile": data.recv_telephone,  //手机号码
            "name": data.recv_name,
            "phone": data.recv_phone // 固定电话
        }
    }
    // 发件人
    setSender(data: IPrintData) {
        this.sender = {
            "address": {
                "city": "北京市",
                "detail": "花家地社区卫生服务站",
                "district": "朝阳区",
                "province": "北京",
                "town": ""
            },
            "mobile": "1326443654",
            "name": "Bar",
            "phone": "057123222"
        }
    }
    // 路由信息
    setRoutingInfo(data: IPrintData) {
        this.routingInfo = {
            consolidation: { // 集包地信息
                code: data.package_center_code,
                name: data.package_center_name,
            },
            "origin": { //发货网点信息
                "code": data.shipping_branch_code,
                "name": data.shipping_branch_name
            },
            sortation: {
                name: ''//大头笔
            },
            routeCode: data.short_address //三段码
        };
    }

    // 密文
    setEncryptedData(data: IEncryptedData) {
        this.encryptedData = {
            "encryptedData": data.encryptedData,
            "signature": data.signature,
            "ver": "waybill_print_secret_version_1"
        }
    }

    setCustomTemplateUrl(url: string) {
        this.customTemplateUrl = url
    }
    // 获取自定义区数据以及模板URL
    setCustomAreaData(data: object) {
        this.customAreaData = { data, templateURL: this.customTemplateUrl };
    }
    // 面单号
    setWaybillCode(waybillCode: string) {
        this.waybillCode = waybillCode;
    }

    toJson() {
        const { encryptedData, waybillCode, customAreaData, mainTemplateUrl, recipient, sender, routingInfo } = this;
        let document = {
            "documentID": waybillCode,
            "contents": <any>[]
        }
        if (encryptedData && Object.keys(encryptedData).length > 0) {
            document.contents.push({ ...encryptedData, "templateURL": mainTemplateUrl })
            // 密文
        } else {
            document.contents.push({ ...recipient, ...sender, ...routingInfo, waybillCode, "templateURL": mainTemplateUrl })
        }
        document.contents.push(customAreaData)
        return document
    }
}

export class PrintTask {
    task: ITaskDocuments<any[]> = {
        documents: [],  // 打印数据
        preview: false,
        printer: '', // 打印机名称
        taskID: TOOLS.getUUID(8, 16)
    }

    // 请求协议头
    setRequestHeader(cmd: string = 'print') {
        return {
            requestID: TOOLS.getUUID(8, 16),
            version: '1.0',
            cmd
        }
    }

    // 预览
    setPreview(previewType: string = 'pdf') {
        this.task.preview = true;
        this.task = { ...this.task, previewType }
    }

    setPrinter(printer: string) {
        this.task.printer = printer
    }

    addDocument(document: object) {
        this.task.documents.push(document)

    }
}
