function parseMarkdown(data){
    let output = "";
    var lines_array = data.split(/\r?\n|\r|\n/g);
    lines_array.forEach(function(item, index){
        output += item + '</br>'
    })
    return output
}
export default parseMarkdown