import * as Bluebird from 'bluebird'
import * as crypto from 'crypto'
import * as otplib from 'otplib'
import { toDataURL as qrCodeDataURL } from 'qrcode'
import * as uuidv4 from 'uuid/v4'

import { BaseResponseGenerator } from '../../utils'
import { ServerResponse } from '../../app.interfaces'
import * as check from '../../app.validation'

import { data } from './otp-device.queries'
import { cache } from '../../app.network-resources'

const HOTP = otplib.hotp.HOTP
const TOTP = otplib.totp.TOTP
const Authenticator = otplib.authenticator.Authenticator
const hotp = new HOTP()
const totp = new TOTP()
const authenticator = new Authenticator()
hotp.options = { crypto }
totp.options = { crypto }
authenticator.options = { crypto }

export class OTPResponseGenerator extends BaseResponseGenerator {
  public data = data
  public hotp = hotp
  public totp = totp
  public qrCodeDataURL = qrCodeDataURL
  public authenticator = authenticator
  public otp = null
  public cache = cache
  constructor() {
    super()
  }

  // :toDo offer specific otp implmentations
  _otpSelectModel(payload) {
    switch (payload) {
      // case 'hotp':
      //   return hotp
      // case 'totp':
      //   return totp
      default:
        return this.authenticator
    }
  }

  otpRegisterStart(payload): Bluebird<ServerResponse> {

    // validation specs
    const specs = [
      { prop: 'type', fn: check.typeCheck, fnMessage: check.typeCheckMessage },
    ]

    // validation process
    const validation = this.validatePayload(payload, specs)

    // handle invalid
    if (!validation.valid) {
      return Bluebird.resolve(this.genServerResponse(this.genError('validation', validation.problems), 400))
    }
    // handle valid
    else {
      const u2fid = this.genU2fId(payload.appId, payload.account, payload.secret)

      const otp = this._otpSelectModel(payload.type)
      const secret = otp.generateSecret()
      const cacheKey = `otp.reg.${u2fid}`
      return this.cache.set(cacheKey, secret)
        .then((c) => {
          const otpAuthenticate = otp.keyuri(payload.account, payload.appId, secret)
          return this.qrCodeDataURL(otpAuthenticate)
            .then(imageUrl => {
              const info: any = {imageUrl, secret}
              return this.genServerResponse(info)
            })
            .catch(err => {
              return this.genServerResponse(this.genError('qrcode', err), 500)
            })
        })
        .catch(err => {
          return this.genServerResponse(this.genError('cache', err), 500)
        })

    }

  }

  otpRegisterFinish(payload): Bluebird<ServerResponse> {

    // validation specs
    const specs = [
      { prop: 'token', fn: check.tokenCheck, fnMessage: check.tokenCheckMessage },
      { prop: 'type', fn: check.typeCheck, fnMessage: check.typeCheckMessage },
      { prop: 'nickname', fn: check.nicknameCheck, fnMessage: check.nicknameCheckMessage },
    ]

    // validation process
    const validation = this.validatePayload(payload, specs)

    // handle invalid
    if (!validation.valid) {
      return Bluebird.resolve(this.genServerResponse(this.genError('validation', validation.problems), 400))
    }
    // handle valid
    else {
      payload.nickname = payload.nickname || this.genNickname('OTP Device')
      const u2fid = this.genU2fId(payload.appId, payload.account, payload.secret)

      const otp = this._otpSelectModel(payload.type)
      const cacheKey = `otp.reg.${u2fid}`
      return this.cache.get(cacheKey)
        .then(secret => {
          if (otp.check(payload.token, secret)) {
            let record = {
              uuid: uuidv4(),
              u2fid,
              secret,
              nickname: payload.nickname
            }
            return this.data.create.record(record)
              .then((dbResponse) => {
                let info: any = { message: 'OTP Device Registered!'}
                return this.genServerResponse(info)
              })
              .catch(err => {
                return this.genServerResponse(this.genError('database', err), 500)
              })
          }
          const msg = 'registration failed: token failed otp check'
          return this.genServerResponse(this.genError('registration', msg), 400)

        })
        .catch(err => {
          return this.genServerResponse(this.genError('cache', err), 500)
        })
    }

  }

  otpRemove(payload): Bluebird<ServerResponse> {

    // validation specs
    const specs = [
      { prop: 'uuid', fn: check.uuid4Check, fnMessage: check.uuid4CheckMessage }
    ]

    // validation process
    const validation = this.validatePayload(payload, specs)

    // handle invalid
    if (!validation.valid) {
      return Bluebird.resolve(this.genServerResponse(this.genError('validation', validation.problems), 400))
    }
    // handle valid
    else {
      const u2fid = this.genU2fId(payload.appId, payload.account, payload.secret)
      return this.data.delete.byU2fIdUuid(u2fid, payload.uuid)
        .then(recordsRemoved => {
          if (recordsRemoved === 0) {
            return this.genServerResponse(this.genError('record', 'Record does not exist.'), 400)
          }
          return this.genServerResponse({ data: 'Record removed.' }, 200)
        })
        .catch(err => {
          return this.genServerResponse(this.genError('database', err), 500)
        })
    }

  }

  otpAuthenticate(payload): Bluebird<ServerResponse> {

    // validation specs
    const specs = [
      { prop: 'token', fn: check.tokenCheck, fnMessage: check.tokenCheckMessage },
    ]

    // validation process
    const validation = this.validatePayload(payload, specs)

    // handle invalid
    if (!validation.valid) {
      return Bluebird.resolve(this.genServerResponse(this.genError('validation', validation.problems), 400))
    }
    // handle valid
    else {
      const u2fid = this.genU2fId(payload.appId, payload.account, payload.secret)

      const otp = this._otpSelectModel(payload.type)
      return this.data.read.byU2fId(u2fid)
        .then(dbResponse => {
          let admit = false
          // iterate through each entry | stop at end OR check passes
          for (let i = 0; !admit && i < dbResponse.length ; i++) {
            admit = otp.check(payload.token, dbResponse[i].secret)
          }
          if (!admit) {
            return this.genServerResponse(this.genAuthError(u2fid), 400)
          }
          return this.genServerResponse(this.genAuthSuccess(u2fid))

        })
        .catch(err => {
          return this.genServerResponse(this.genError('database', err), 500)
        })
    }
  }

}

export const api = new OTPResponseGenerator()
