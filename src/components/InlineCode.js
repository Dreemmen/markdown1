import parseInline from "../helpers/parseInlineHTML"

function InlineCode({data, index}) {
    const markdown = data.split("`")
    
    return (
        <p key={index}>
            {markdown.map( (string, localIndex) => {
                //every other result is inline code
                if(localIndex%2 == 1){
                    return <code key={localIndex} className="inline-code">{string}</code>
                }
                //šeit funkcija palīgs, kas apstrādās parastu string
                return parseInline(string, localIndex)
            })}
        </p>
    )
}
export default InlineCode