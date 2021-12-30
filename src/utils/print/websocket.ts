/*
 * @Author: lu
 * @Date: 2021-12-21 14:29:59
 * @LastEditTime: 2021-12-24 10:33:29
 * @FilePath: \vue-ts-erp\src\utils\print\websocket.ts
 * @Description:
 */
export interface IWSClient {
    _state: number
    contect(): void
    send(data: object): Promise<any>
}

export const STATE = {
    CONNECTING: 0, //正在连接
    OPEN: 1, //连接成功，可以通信
    CLOSING: 2, //连接正在关闭
    CLOSED: 3 //连接已经关闭，或者打开连接失败
};

export const TOOLS = {
    _chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
    getUUID(len: number, radix?: any) {
        let uuid = [], i;
        radix = radix || this._chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = this._chars[0 | Math.random() * radix];
        } else {
            let r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = this._chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
};

export class WSClient implements IWSClient {
    _isSupported: boolean | undefined  // 浏览器是否支持 WebSocket 
    _state!: number // 当前链接状态
    _ws: WebSocket | undefined // WebSocket实例对象
    _wsUrl: string | undefined // 待链接的地址
    _recount: number | undefined    // 重连的次数 默认 0
    _waitQueues: { [key: string]: Function } = {}

    constructor(wsUrl: string) {
        this._wsUrl = wsUrl
        this._state = STATE.CONNECTING

        if ('WebSocket' in window) {
            this._isSupported = true;
        } else {
            this._isSupported = false;
            console.log('浏览器版本过低，请使用高版本浏览器打开');
            throw new Error('浏览器版本过低，请使用高版本浏览器打开')
        }
    }

    contect() {
        if (!this._wsUrl) {
            throw new Error('wsUrl is empty')
        }

        this._ws = new WebSocket(this._wsUrl);

        // 连接成功
        this._ws.onopen = (e) => {
            this._state = STATE.OPEN
            console.trace(this._wsUrl, 'connect success');
        }
        // 连接失败
        this._ws.onerror = (e) => {
            this._state = STATE.CLOSED
            console.trace(this._wsUrl, 'catch error', e);
        }
        // 连接关闭 重连5次
        this._ws.onclose = (e) => {
            this._state = STATE.CLOSED
            console.trace(this._wsUrl, 'try reconnect')
        }
        // 服务器返回响应数据
        this._ws.onmessage = (e) => {
            let data = JSON.parse(e.data);
            let resolve = this._waitQueues[data.requestID];
            if (resolve === undefined) {
                return;
            }
            delete this._waitQueues[data.requestID];
            resolve(data);
        }
    }

    send(data: any) {
        return new Promise((resolve, reject) => {
            if (this._state == STATE.OPEN) {
                let reqID: string | null = data.requestID || null;
                if (reqID === null) {
                    return reject(new Error('not found `requestID`'));
                }
                if (this._waitQueues[reqID] != undefined) {
                    return reject(new Error('exists'));
                }
                this._waitQueues[reqID] = resolve;
                this._ws?.send(JSON.stringify(data));
            } else {
                reject(new Error('state error'))
            }
        })
    }
}
