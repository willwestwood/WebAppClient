import { serverConnection } from "./StaticData";
import qs from 'qs';

export const isEmpty = function (obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function buildServerConnectionStr() {
    return serverConnection.protocol + "://"
    + serverConnection.domain + ":"
    + serverConnection.port
}

export const getServerConnectionStr = function (route, params = undefined) {
    let conStr = buildServerConnectionStr() + "/" 
    + serverConnection.apiPrefix + "/"
    + route

    if (params !== undefined) {
        conStr += "?"
        conStr += qs.stringify(params)
    }

    return conStr
}