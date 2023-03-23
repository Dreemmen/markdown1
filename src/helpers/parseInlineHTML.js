function parseInlineHTML(string){
    if(string.indexOf("**")>=0){
        let partsArray = string.split("**")
        let new_string = ''
        partsArray.map( (string, localIndex) => {
            //every other result is inline code is html tag insert
            if(localIndex%2 == 1){
                    new_string += '<b>' + string + '</b>'
            // else case is just string parts conatation back together
            }else{
                new_string += string
            }
        })
        string = new_string
    }
    if(string.indexOf("_")>=0){
        let partsArray = string.split("_")
        let new_string = ''
        partsArray.map( (string, localIndex) => {
            //every other result is inline code is html tag insert
            if(localIndex%2 == 1){
                    new_string += '<i>' + string + '</i>'
            // else case is just string parts conatation back together
            }else{
                new_string += string
            }
        })
        string = new_string
    }
    if(string.indexOf("~~")>=0){
        let partsArray = string.split("~~")
        let new_string = ''
        partsArray.map( (string, localIndex) => {
            //every other result is inline code is html tag insert
            if(localIndex%2 == 1){
                    new_string += '<s>' + string + '</s>'
            // else case is just string parts conatation back together
            }else{
                new_string += string
            }
        })
        string = new_string
    }
    if(string.indexOf("[links]")>=0){
        let partsArray = string.split("[links]")
        let new_string = ''
        partsArray.map( (string, localIndex) => {
            //every other result is inline code is html tag insert
            if(localIndex%2 == 1){
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(string);
                    new_string += '<a href="' + matches[1] + '">' + matches[1] + '</a>'
            // else case is just string parts conatation back together
            }else{
                new_string += string
            }
        })
        string = new_string
    }
    return string
}
export default parseInlineHTML