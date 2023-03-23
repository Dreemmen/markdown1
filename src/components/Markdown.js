import { useState } from "react";
import { observer } from "mobx-react";
import InlineCode from "./InlineCode";
import parseInlineHTML from "../helpers/parseInlineHTML"
import BlockQuote from "./BlockQuote";
import BlockCode from "./BlockCode" 
import BlockTable from "./BlockTable"
import BlockList from "./BlockList"
import BlockListNumbered from "./BlockListNumbered"
import BlockImage from "./BlockImage"

function Markdown({store}) {
    const data = store.getData
    const markdown = data.split(/\r?\n|\r|\n/g);
    let checkForCode = false
    let checkForTable = false
    let checkForList = false
    let checkForListNum = false
    let outputToBuffer = false
    let buffer = ''

    function parseSingleString(string, index){
        if(string.indexOf("###")==0) return <h3 key={index}>{string.substring(3)}</h3>
        if(string.indexOf("##")==0) return <h2 key={index}>{string.substring(2)}</h2>
        if(string.indexOf("#")==0) return <h1 key={index}>{string.substring(1)}</h1>
        if(string.indexOf("`")>=0 && string.indexOf("``") == (-1) && string.match(/`([^`]*)`/g)){
             return <InlineCode data={string} index={index}/>
        }
        if(string.match(/!\[(.*?)\]\(/gm) && string.match(/\]\((.*?)\)/gm)){
            let alt = string.match(/!\[(.*?)\]\(/gm)[0].substring(2).slice(0, -2)
            let src = string.match(/\]\((.*?)\)/gm)[0].substring(2).slice(0, -1)
            return <BlockImage alt={alt} src={src} />
        }
        return <p key={index} dangerouslySetInnerHTML={{__html: parseInlineHTML(string)}}></p>
    }
    return (
        <>
            {markdown.map( (string, index) => {
                //if we see ``` tag first time, set output to buffer
                if(string.indexOf("```")>=0 && string.indexOf("```")<=2 && !checkForCode){
                    checkForCode = true
                    outputToBuffer= true
                    buffer = ''
                    return ''
               }
               //if we see ``` tag second time, return <code> with buffer
                if(string.indexOf("```")>=0 && string.indexOf("```")<=2 && checkForCode){
                    checkForCode = false
                    outputToBuffer = false
                    //return all buffered strings
                     return <BlockCode index={index}>{buffer}</BlockCode>
                }
                // ">" symbol for blockquote
                if(string.indexOf(">")==0 && string.indexOf(">>") == (-1)){
                    return <BlockQuote data={string} index={index}/>
                }
                //if we see | tag first time, check next line for "- |", if yes, this is table
                if(string.indexOf("|")>=0 && markdown[index+1].indexOf("- |")>=0 && !checkForTable){
                    checkForTable = true
                    outputToBuffer= true
                    buffer = ''
               }
               //check this line for table identifier, if not found, output table and continue
               if(checkForTable && string.indexOf("|") == (-1) ){
                    checkForTable = false
                    outputToBuffer= false
                    return <><BlockTable index={index}>{buffer}</BlockTable>{parseSingleString(string)}</>
               }
                //if we see - after all spaces, this is list
                if(string.indexOf("-")==0 && string.indexOf("- |") == (-1) && string.indexOf("--") == (-1) && !checkForList){
                    checkForList = true
                    outputToBuffer= true
                    buffer = ''
               }
                //check this line for list identifier, if not found, output list and continue
                if(checkForList && string.trim().indexOf("-") !== 0 ){
                    checkForList = false
                    outputToBuffer= false
                    return <><BlockList index={index}>{buffer}</BlockList>{parseSingleString(string)}</>
                }

                //, this is numbered list
                if(!isNaN(string.charAt(0)) && string.indexOf(".")===1 && !checkForListNum){

                    checkForListNum = true
                    outputToBuffer= true
                    buffer = ''
                }
                //check this line for list identifier, if not found, output list and continue
                if(checkForListNum && isNaN(string.trim().charAt(0)) ){
                    checkForListNum = false
                    outputToBuffer= false
                    return <><BlockListNumbered index={index}>{buffer}</BlockListNumbered>{parseSingleString(string)}</>
                }     

                //output to buffer
                if(outputToBuffer){
                    buffer = buffer + string + '\n'
                    return
                }
                //regular output
                return parseSingleString(string, index)
            })}
        </>
    )
}
export default observer(Markdown)