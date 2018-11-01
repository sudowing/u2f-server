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
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const typeCheckMessage = `Must be a 'string' with length > 1 AND < 500`
export function typeCheck(sample) {
    return validateTypeAndLength(sample, 'string', 1, 500)
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
    return validateTypeAndLength(parseInt(sample, 10), 'number', 99999, 1000000)
}

export const uuid4CheckMessage = `Must be a UUID4`
export function uuid4Check(sample) {
    return regexPattern.uuid4.test(sample)
}

export const registrationResponseCheckMessage = `wyz`
export function registrationResponseCheck(sample) {
    return true
}

// account | length && string
// token | length && string
// nickname | length && string
// type | length && string
// secret | length && string
// code | length (8) && string
// token | length && number (otp code)

// uuid | uuid
// appId | url



// registrationResponse | keys must exist && keys must each meet
    // registrationData | length (min) && string
    // version | length && string
    // appId | lurl
    // challenge | length && string
    // clientData | length (min) && string
// regex
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

//   { prop: 'other', fn: zzzzzzz, fnMessage: zzzzzzMessage } // custom fn run on prop

//   { prop: 'other', fn: (input) => true, fnMessage: 'Must be this or that' } // custom fn run on prop
