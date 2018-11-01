const regexPattern: any = {}
regexPattern.uuid4 = /[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}/
regexPattern.url = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

export function validateTypeAndLength(sample, typeString, lengthMin = null, lengthMax = null) {
    const validType = typeof sample === typeString
    const short = !isNaN(lengthMin) ? sample.length < lengthMin : true
    const long = !isNaN(lengthMax) ? sample.length > lengthMax : true
    return validType && !short && !long
}

export const accountCheckMessage = ``
export function accountCheck(sample) {
    console.log('sample | ', sample)
    console.log('sample.length | ', sample.length)
    console.log('account', typeof sample)
    const validType = typeof sample === 'string'
    var wip = sample.length > 1
    console.log('sample.length > lengthMin ::: ', wip)
    var wip = sample.length < 500
    console.log('sample.length < lengthMax ::: ', wip)

    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const nicknameCheckMessage = ``
export function nicknameCheck(sample) {
    console.log('nickname', typeof sample)
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const typeCheckMessage = ``
export function typeCheck(sample) {
    console.log('type', typeof sample)
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const secretCheckMessage = ``
export function secretCheck(sample) {
    console.log('secret', typeof sample)
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const codeCheckMessage = ``
export function codeCheck(sample) {
    console.log('code', typeof sample)
    // length == 8
    return validateTypeAndLength(sample, 'string', 1, 500)
}

export const tokenCheckMessage = ``
export function tokenCheck(sample) {
    console.log('token', typeof sample)
    return validateTypeAndLength(parseInt(sample, 10), 'number', 1, 500)
}

export const uuid4CheckMessage = ``
export function uuid4Check(sample) {
    console.log('uuid4', typeof sample)
    return regexPattern.uuid4.test(sample)
}

export const urlCheckMessage = ``
export function urlCheck(sample) {
    console.log('url', typeof sample)
    return regexPattern.url.test(sample)
}

export const registrationResponseCheckMessage = ``
export function registrationResponseCheck(sample) {
    console.log('registrationResponse', typeof sample)
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
