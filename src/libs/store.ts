export class Store<T extends object> {
    private storePrefix: string
    private template: T
    constructor(prefix: string, obj: T) {
        this.storePrefix = prefix
        this.template = obj
    }
    set(key: keyof T, value: T[keyof T]) {
        const data = this.getAll()
        Object.assign(data, { [key]: value })
        try {
            const content = JSON.stringify(data)
            window.localStorage.setItem(this.storePrefix, content)
        } catch (err) {
            throw err
        }
    }
    get(key: keyof T): T[keyof T] {
        const data = this.getAll()
        return data[key]

    }
    getAll(): T {
        const temp = window.localStorage.getItem(this.storePrefix)
        if (!temp) {
            // init
            return this.template
        }
        try {
            return JSON.parse(temp)
        } catch (err) {
            throw new Error("error parse string to json object in storage")
        }
    }
}