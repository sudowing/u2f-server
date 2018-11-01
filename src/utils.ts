import * as Bluebird from 'bluebird'
import * as crypto from 'crypto'
import * as uuidv4 from 'uuid/v4'

import { data } from './app.queries'
import { ServerResponseAuthSuccess, ServerResponseError, ServerResponse } from './app.interfaces'
import * as check from './app.validation'
interface ValidationProblem {
  prop: string,
  message: string
}

interface ValidationResponse {
  valid: boolean,
  problems: ValidationProblem[]
}

function _validatePayload(payload, specs): ValidationResponse {
  const msg = (prop, message): ValidationProblem => ({ prop, message })
  const problems: ValidationProblem[] = []
  for (let spec of specs) {
    if (spec.hasOwnProperty('fn') && !spec.fn(payload[spec.prop])) {
      problems.push(msg(spec.prop, spec.fnMessage))
    }
    else if (spec.hasOwnProperty('positive') && !payload[spec.prop]) {
      let errMsg = `Field must not be Null`
      problems.push(msg(spec.prop, errMsg))
    }
    else if (!payload.hasOwnProperty(spec.prop)) {
      let errMsg = `Field Required`
      problems.push(msg(spec.prop, errMsg))
    }
  }
  return { valid: problems.length < 1, problems }
}

// =====================
// USAGE: _validatePayload
// =====================
//
// const specs = [
//   { prop: 'this' }, // prop exists
//   { prop: 'that', positive: true }, // prop exists and passes == test
//   { prop: 'other', fn: (input) => true, fnMessage: 'Must be this or that' } // custom fn run on prop
// ]
// const validation = validatePayload(payload, specs)
// if (!validation.valid){
//   res.send(400, {error: 'validation', problems: validation.problems})
// }
// else {
//   ... more handling within controller
// }






// defaultSpecs. defined in fn signature so it can be omitted during calls
const defaultSpecs = []

// base validation specs
const baseSpecs = [
  { prop: 'appId', fn: check.urlCheck, fnMessage: check.urlCheckMessage },
  { prop: 'account', fn:  check.accountCheck, fnMessage:  check.accountCheckMessage },
  { prop: 'secret', positive: true }
]



function genU2fId(appId: string, account: string|number, secret: string= 'vampire-weekend'): string {
  return crypto.createHmac('sha256', secret)
    .update(`u2f:${account}:${appId}`)
    .digest('hex')
}


function genNickname(deviceType: string): string {
  const d = new Date()
  const FullYear = d.getUTCFullYear()
  const Month = d.getUTCMonth()
  const Day = d.getUTCDay()
  const Hours = d.getUTCHours()
  const Minutes = d.getUTCMinutes()
  const nickname = `${deviceType} created @ ${FullYear}-${Month}-${Day} ${Hours}:${Minutes}`
  return nickname
}




function genServerResponse(payload, statusCode: number = 200): ServerResponse {
  return { statusCode, payload }
}


function genError(error: string, detail: any): ServerResponseError {
  return {
    error,
    detail
  }
}

function determineAuthType(classType) {
  switch (classType) {
    case 'BackupCodeResponseGenerator':
      return 'CODE'
    case 'OTPResponseGenerator':
      return 'OTP'
    case 'U2FResponseGenerator':
      return 'U2F '
    default:
      return 'UNKNOWN'
  }
}

function genAuthError(u2fid): ServerResponseError {
  const record = {
    uuid: uuidv4(),
    u2fid,
    auth_type: determineAuthType(this.constructor.name),
    result: false
  }
  this._data.create.log(record).then()
  return genError('authentication', 'Provided Credentials No Good.')
}

function genAuthSuccess(u2fid): ServerResponseAuthSuccess {
  const record: any = {
    uuid: uuidv4(),
    u2fid,
    auth_type: determineAuthType(this.constructor.name),
    result: true
  }
  this._data.create.log(record).then()
  const apiresponse: any = {
    auth_type: record.auth_type,
    result: record.result
  }
  return apiresponse
}

export class BaseResponseGenerator {
  public _data = data

  constructor() { }

  genServerResponse = genServerResponse
  genError = genError
  genAuthError = genAuthError
  genAuthSuccess = genAuthSuccess
  genU2fId = genU2fId
  genNickname = genNickname
  _validatePayload = _validatePayload
  baseSpecs = baseSpecs
  defaultSpecs = defaultSpecs

  // wrapper around _validatePayload so to apply middleware baseSpecs to majority of responses
  validatePayload = function(payload, specs=defaultSpecs, applyBaseSpecs=true): ValidationResponse {
    // include/exclude base specs to route. alternative to middleware for each request.
    const validationSpecs = applyBaseSpecs ? baseSpecs.concat(specs) : specs
    // call to raw validation function
    return this._validatePayload(payload, validationSpecs)
  }

}

import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
export const readFilePromise = promisify(readFile)
export const writeFilePromise = promisify(writeFile)
