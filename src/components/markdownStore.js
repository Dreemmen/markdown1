import { makeObservable, observable, action, computed, autorun } from "mobx"

class MarkdownStore {
    rawData = ''
    outputRawLine = false

    constructor(){
        makeObservable(this, {
            rawData: observable,
            outputRawLine: true,
            getData: true,
            rawDataChange: action,
        })
        autorun(() => {
            //console.log(this.rawData)
        })
    }
    rawDataChange(value){
        this.rawData = value
    }
    get getData(){
        return this.rawData
    }
}
export default new MarkdownStore()