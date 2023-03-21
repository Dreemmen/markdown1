import { makeObservable, observable, action } from "mobx"

class MarkdownStore {
    rawData = ''
    parsedData = ''

    constructor(){
        makeObservable(this, {
            rawData: observable,
            rawDataChage: action
        })
    }
    rawDataChage(value){
        this.rawData = value
    }
}
export default new MarkdownStore()