import parseInlineHTML from "../helpers/parseInlineHTML"

function BlockListNumbered({children, index}) {
    let markdown = children.split(/\r?\n|\r|\n/g);
    let resulting_string = ''

    markdown.map( (string, localindex) => {
        if(string=='') return
        resulting_string += '<li>' + parseInlineHTML(string.trim().substring(2))
        if(markdown[localindex+1] !== undefined){
            if((markdown[localindex+1].indexOf(".")-1) > (string.indexOf(".")-1)){
                resulting_string += '<ol>'
            }
            if((markdown[localindex+1].indexOf(".")-1) < (string.indexOf(".")-1)){
                resulting_string += '</li></ol>'
                if((markdown[localindex+1].indexOf(".")-1)==0) resulting_string += '</li></ol>'
            }
        }
    })
    return (
        <ol key={index} dangerouslySetInnerHTML={{__html: resulting_string}}>
        </ol>
    )
}
export default BlockListNumbered