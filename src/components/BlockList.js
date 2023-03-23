import parseInlineHTML from "../helpers/parseInlineHTML"

function BlockList({children, index}) {
    let markdown = children.split(/\r?\n|\r|\n/g);
    let resulting_string = ''

    markdown.map( (string, localindex) => {
        if(string=='') return
        resulting_string += '<li>' + parseInlineHTML(string.trim().substring(1))
        if(markdown[localindex+1] !== undefined){
            if(markdown[localindex+1].indexOf("-") > string.indexOf("-")){
                resulting_string += '<ul>'
            }
            if(markdown[localindex+1].indexOf("-") < string.indexOf("-")){
                resulting_string += '</li></ul>'
                if(markdown[localindex+1].indexOf("-")==0) resulting_string += '</li></ul>'
            }
        }
    })
    return (
        <ul key={index} dangerouslySetInnerHTML={{__html: resulting_string}}>
        </ul>
    )
}
export default BlockList