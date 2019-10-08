export const isEmpty = function (obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const getServerConnectionStr = function (serverConnection, params = undefined) {
    let conStr = serverConnection.domain + ":" + serverConnection.port + "/"
    
    if (serverConnection.apiPrefix != undefined)
        conStr += serverConnection.apiPrefix + "/"

    if (params != undefined) {
        conStr += "?"
    }

    return conStr
}