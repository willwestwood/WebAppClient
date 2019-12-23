var utils = require('./Utils.js')

const ErrorType = {
    NONE: 0,
    UNKNOWN: 1,
    INCORRECT_PASSWORD: 2, 
    UNKNOWN_EMAIL_ADDRESS: 3, 
    USER_PENDING: 4,
    NO_TOKEN: 5,
    INVALID_TOKEN: 6,
    AUTHENTICATION_FAILED: 7,
    COUNT: 8
}
Object.freeze(ErrorType)
module.exports.ErrorType = ErrorType

module.exports.toErrorType = async id => {
    if (id >= 0 && id < ErrorType.COUNT) {
        return await utils.getKeyByValue(ErrorType, id)
    }
}

module.exports.fromErrorType = async type => {
    return ErrorType[type]
}

module.exports.getErrorString = async id => {
    switch(id) {
        case ErrorType.NONE: return ""
        case ErrorType.UNKOWN: return "An unknown error has occurred"
        case ErrorType.INCORRECT_PASSWORD: return "Password is incorrect"
        case ErrorType.UNKNOWN_EMAIL_ADDRESS: return "Email address not recognised"
        case ErrorType.USER_PENDING: return "Cannot perform this action until user has been approved"
        case ErrorType.NO_TOKEN: return "Technical error: No token found"
        case ErrorType.INVALID_TOKEN: return "Session has timed out"
        case ErrorType.AUTHENTICATION_FAILED: return "Technical error: Authentication failed"
        default: return ""
    }
}