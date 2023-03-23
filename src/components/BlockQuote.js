import parseInlineHTML from "../helpers/parseInlineHTML"

function BlockQuote({data, index}) {
    const string = data.substring(1);
    
    return (
        <blockquote key={index} dangerouslySetInnerHTML={{__html: parseInlineHTML(string)}}>
        </blockquote>
    )
}
export default BlockQuote