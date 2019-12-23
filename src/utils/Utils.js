var serverConnection = require("./StaticData").serverConnection
var axios = require('axios')
var qs = require('qs')
var Session = require('./Session');
var enums = require('./enums')

var exports = module.exports = {}

exports.isEmpty = function (obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return JSON.stringify(obj) == JSON.stringify({});
}

exports.buildServerConnectionStr = function () {
    return serverConnection.protocol + "://"
    + serverConnection.domain + ":"
    + serverConnection.port
}

exports.getServerConnectionStr = function (route, params = undefined) {
    let conStr = exports.buildServerConnectionStr() + "/" 
    + serverConnection.apiPrefix + "/"
    + route

    if (params !== undefined) {
        conStr += "?"
        conStr += qs.stringify(params)
    }

    return conStr
}

exports.getKeyByValue = async function(object, value) {
    return await Object.keys(object).find(key => object[key] == value);
}

exports.serverGetRequest = async function (route, useToken, history, params = undefined, action = ''){
    if (action != "")
        route += "/" + action

    let header = {}
    if (useToken === true) {
        let token = Session.getSessionCookie().token
        if (exports.isEmpty(token)) {
            alert(await enums.getErrorString(enums.ErrorType.INVALID_TOKEN))
            history.push("/login")
            return {}
        }

        header = {
            'x-access-token': Session.getSessionCookie().token
        }
    }

    let data = {}
    await axios.get(exports.getServerConnectionStr(route, params), { headers: header })
    .then(response => {
        if (response.data.success === 'true')
            data = response.data
        else {
            console.log(response.data.message)
            switch(response.data.errorId) {
                case enums.ErrorType.AUTHENTICATION_FAILED:
                case enums.ErrorType.INVALID_TOKEN:
                case enums.ErrorType.NO_TOKEN:
                    alert(enums.getErrorString(response.data.errorId))
                    Session.resetSessionCookie()
                    history.push("/login")
                    break
                default:
                    data = enums.getErrorString(response.data.errorId)
            }
        }
      })
      .catch(e => {
        console.log(e)
        history.push("/error");
    })
    return data
}

exports.sortArray = async function (arr, prop) {
    if (exports.isEmpty(arr))
        return
    arr.sort(function(a, b) {
      let x = a[prop].toLowerCase()
      let y = b[prop].toLowerCase()
      if (x < y) { return -1 }
      if (x > y) { return 1 }
      return 0
    })
  }