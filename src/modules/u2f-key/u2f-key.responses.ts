import * as Bluebird from 'bluebird'
import * as u2f from 'u2f'
import * as uuidv4 from 'uuid/v4'

import { BaseResponseGenerator } from '../../utils'
import { ServerResponseSuccess, ServerResponseError, ServerResponse } from '../../app.interfaces'

import { data } from './u2f-key.queries'
import { cache } from '../../app.network-resources'


export class U2FResponseGenerator extends BaseResponseGenerator {
  public data = data
  public cache = cache
  public u2f = u2f
  constructor() {
    super()
  }

  keyRegisterStart(payload): Bluebird<ServerResponse> {

    // validation specs
    const specs = [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true }
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

      // this.gen registration request and cache it
      const registrationRequest = this.u2f.request(payload.appId)
      const cacheKey = `u2f.reg.${u2fid}`
      return this.cache.set(cacheKey, JSON.stringify(registrationRequest))
        .then((c) => {
          return this.genServerResponse(registrationRequest)
        })
        .catch(err => {
          return this.genServerResponse(this.genError('cache', err), 400)
        })
    }
  }

  keyRegisterFinish(payload): Bluebird<ServerResponse> {

    // validation specs
    const specs = [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'registrationResponse', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'nickname' }
    ]

    // validation process
    const validation = this.validatePayload(payload, specs)

    // handle invalid
    if (!validation.valid) {
      return Bluebird.resolve(this.genServerResponse(this.genError('validation', validation.problems), 400))
    }
    // handle valid
    else {
      payload.nickname = payload.nickname || this.genNickname('U2F Key')
      const u2fid = this.genU2fId(payload.appId, payload.account, payload.secret)

      const cacheKey = `u2f.reg.${u2fid}`
      return this.cache.get(cacheKey)
        .then(jsonRegistrationRequest => JSON.parse(jsonRegistrationRequest))
        .then((registrationRequest) => {
          const result = this.u2f.checkRegistration(registrationRequest, payload.registrationResponse)
          if (result.successful) {
            let record: any = {
              uuid: uuidv4(),
              u2fid,
              key_handle: result.keyHandle,
              public_key: result.publicKey,
              version: registrationRequest.version,
              nickname: payload.nickname
            }
            return this.data.create.record(record)
              .then(() => {
                return this.genServerResponse(record)
              })
              .catch(err => {
                return this.genServerResponse(this.genError('database', err), 400)
              })
          }
          else {
            return this.genServerResponse(this.genError('registration', result), 400)
          }
        })
        .catch(err => {
          return this.genServerResponse(this.genError('cache', err), 400)
        })
    }
  }


  keyRemove(payload): Bluebird<ServerResponse> {

    // validation specs
    const specs = [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'uuid', positive: true },
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
          return this.genServerResponse(this.genError('database', err), 400)
        })
    }

  }



  keyAuthenticateStart(payload) {

    // validation specs
    const specs = [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true }
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

      const query = this.data.read.byU2fId(u2fid)
      const authRequest = this.u2f.request(payload.appId)

      const cacheKey = `u2f.auth.${u2fid}`
      return Bluebird.all([this.cache.set(cacheKey, JSON.stringify(authRequest)), query])
        .then(([c, results]) => {
          let info: any = { key_handles: results, authRequest }
          return this.genServerResponse(info)
        })
        .catch(err => {
          return this.genServerResponse(this.genError('datastore', err), 400)
        })
    }

  }

  keyAuthenticateFinish(payload) {

    // validation specs
    const specs = [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'registrationResponse', positive: true }

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

      const query = this.data.read.byU2fIdKeyhandle(u2fid, payload.registrationResponse.keyHandle)
      const cacheKey = `u2f.auth.${u2fid}`

      return Bluebird.all([this.cache.get(cacheKey), query])
        .then(([jsonAuthRequest, results]) => {
          const authRequest = JSON.parse(jsonAuthRequest)
          const admit = this.u2f.checkSignature(authRequest, payload.registrationResponse, results[0].public_key)
          if (!admit) {
            return this.genServerResponse(this.genAuthError(u2fid), 400)
          }
          else {
            return this.genServerResponse(this.genAuthSuccess(u2fid))
          }
        })
        .catch(err => {
          return this.genServerResponse(this.genError('datastore', err), 400)
        })
    }

  }

}

export const api = new U2FResponseGenerator()
