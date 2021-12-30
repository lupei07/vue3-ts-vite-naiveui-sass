/*
 * @Author: lu
 * @Date: 2021-11-30 15:41:53
 * @LastEditTime: 2021-11-30 16:40:51
 * @FilePath: \vue-ts-erp\src\utils\storage.ts
 * @Description: 全局存储类封装
 */

interface IStorage {
    setItem<T>(key: string, value: T): void
    getItem(key: string): string
    removeItem(key: string): void
}

class VStorage implements IStorage {
    private static instance: VStorage
    constructor() {

    }
    static shared() {
        if (!this.instance) {
            this.instance = new VStorage()
        }
        return this.instance
    }
    setItem<T>(key: string, value: T) {
        const valueJson = JSON.stringify(value)
        window.localStorage.setItem(key, valueJson)
    }
    getItem(key: string) {
        const value = window.localStorage.getItem(key)
        return value as string
    }
    removeItem(key: string) {
        window.localStorage.removeItem(key)
    }
}

export default VStorage.shared()