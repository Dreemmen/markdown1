import parseInlineHTML from "../helpers/parseInlineHTML"

function BlockTable({children, index}) {
    const markdown = children.split(/\r?\n|\r|\n/g);
    let headers = true

    return (
        <table key={index}>
        {markdown.map( (string, localindex) => {
            if(string.indexOf("- |") == -1 && string != ''){
                string = parseInlineHTML(string)
                let cells = string.split("|")
                if(headers){
                    headers = false
                    return <tr key={localindex} dangerouslySetInnerHTML={{__html: '<th>'+cells.join("</th><th>")+'</th>'}}></tr>
                }else{
                    return <tr key={localindex} dangerouslySetInnerHTML={{__html: '<td>'+cells.join("</td><td>")+'</td>'}}></tr>
                }
            }
        })}
        </table>
    )
}
export default BlockTable