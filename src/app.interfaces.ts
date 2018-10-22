// sting[]
import {otpResRegisterStart, otpResRegisterFinish} from './modules/otp-device/otp-device.interfaces'
import {keyAuthenticateStart, keyRegisterFinish} from './modules/u2f-key/u2f-key.interfaces'

export interface ServerResponseAuthSuccess {
  auth_type: string,
  result: boolean
}

export interface ServerResponseError {
  error: string,
  detail: any
}

export interface ServerResponse {
  statusCode: number,
  payload: ServerResponseError|string[]|otpResRegisterStart|otpResRegisterFinish|keyAuthenticateStart|keyRegisterFinish
}
