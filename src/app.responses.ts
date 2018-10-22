import * as Bluebird from 'bluebird'
import { BaseResponseGenerator, readFilePromise } from './utils'

import { data } from './app.queries'

export class AppResponseGenerator extends BaseResponseGenerator {
  public data = data
  constructor() {
    super()
  }

  mfaStatus(payload) {

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
      const queryKeys = this.data.read.u2fKeys.byU2fId(u2fid)
      const queryCodes = this.data.read.backupCodes.byU2fId(u2fid)
      const queryOtpDevices = this.data.read.otpDevices.byU2fId(u2fid)
      // need to refactor above to use a .union (currently making 3 seperate calls)
      return Bluebird.all([queryKeys, queryCodes, queryOtpDevices])
        .then(([keys, codes, otpDevices]) => {
          return {
            summary: {
              otp_device: otpDevices.length > 0,
              u2f_key: keys.length > 0,
              backup_code: parseInt(codes[0].count) > 0
            },
            challenges: [].concat.apply([], [keys, otpDevices])
          }
        })
        .then(dbResponse => {
          return this.genServerResponse(dbResponse)
        })
        .catch(err => {
          return this.genServerResponse(this.genError('database', err), 400)
        })

    }
  }

  mfaLogs(payload) {

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

      return this.data.read.logs.byU2fId(u2fid)
        .then(dbResponse => {
          return this.genServerResponse(dbResponse)
        })
        .catch(err => {
          return this.genServerResponse(this.genError('database', err), 400)
        })

    }
  }

  async swagger() {
    const swaggerDocs = await readFilePromise('./src/static/swagger.json', 'utf8')
      .then(JSON.parse)
      .then(payload => {
        return this.genServerResponse(payload, 200)
      })
    return swaggerDocs
  }

}
export const api = new AppResponseGenerator()
