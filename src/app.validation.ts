const regexPattern: any = {}
regexPattern.uuid4 = /[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}/
regexPattern.url = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

export function validateTypeAndLength(sample, typeString, lengthMin = null, lengthMax = null) {
    if (sample === undefined) return false
    const validType = typeof sample === typeString
    const short = !isNaN(lengthMin) ? sample.length < lengthMin : true
    const long = !isNaN(lengthMax) ? sample.length > lengthMax : true
    return validType && !short && !long
}

export const urlCheckMessage = `Must be a 'string' with length > 1 AND < 500`
export function urlCheck(sample) {
    return regexPattern.url.test(sample)
}

export const accountCheckMessage = `Must be a 'string' with length > 1 AND < 500`
export function accountCheck(sample) {
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const nicknameCheckMessage = `Must be a 'string' with length > 1 AND < 500`
export function nicknameCheck(sample) {
    // null is fine || it get geneated if it is null
    return sample === null || validateTypeAndLength(sample, 'string', 1, 500)
}

export const typeCheckMessage = `Must be a 'string' with length > 1 AND < 500`
export function typeCheck(sample) {
    // null is fine
    return  sample === null || validateTypeAndLength(sample, 'string', 1, 500)
}

export const secretCheckMessage = `Must be a 'string' with length > 1 AND < 500`
export function secretCheck(sample) {
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const codeCheckMessage = `Must be a 'string' with length > 1 AND < 500`
export function codeCheck(sample) {
    // length == 8
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const tokenCheckMessage = `Must be a number with 6 digits`
export function tokenCheck(sample) {
    // require a positve value
    return !!sample && validateTypeAndLength(parseInt(sample, 10), 'number', 99999, 1000000)
}

export const uuid4CheckMessage = `Must be a UUID4`
export function uuid4Check(sample) {
    return regexPattern.uuid4.test(sample)
}

export const registrationResponseCheckMessage = `Must contain following keys: 'registrationData', 'version', 'appId', 'challenge' and 'clientData'`
export function registrationResponseCheck(sample) {
    if (!sample) return false
    return (
        sample.hasOwnProperty('registrationData') &&
        typeof sample.registrationData === 'string' &&
        sample.hasOwnProperty('version') &&
        validateTypeAndLength(sample.version, 'string', 5, 10) &&
        sample.hasOwnProperty('appId') &&
        urlCheck(sample.appId) &&
        sample.hasOwnProperty('challenge') &&
        validateTypeAndLength(sample.challenge, 'string', 40, 100) &&
        sample.hasOwnProperty('clientData') &&
        validateTypeAndLength(sample.clientData, 'string', 50, 500)
    )

}

export const authResponseCheckMessage = `Must contain following keys: 'keyHandle', 'clientData' and 'signatureData'`
export function authResponseCheck(sample) {
    if (!sample) return false
    return (
        sample.hasOwnProperty('keyHandle') &&
        validateTypeAndLength(sample.keyHandle, 'string', 20, 400) &&
        sample.hasOwnProperty('clientData') &&
        validateTypeAndLength(sample.clientData, 'string', 20, 400) &&
        sample.hasOwnProperty('signatureData') &&
        validateTypeAndLength(sample.signatureData, 'string', 20, 400)
    )
}