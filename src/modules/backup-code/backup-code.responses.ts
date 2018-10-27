import * as Bluebird from 'bluebird'
import * as crypto from 'crypto'
import * as uuidv4 from 'uuid/v4'

import { BaseResponseGenerator } from '../../utils'

import { data } from './backup-code.queries'
import {
  QueryReadByU2fIdCode,
  BackupCodeRecord
} from './backup-code.interfaces'

const nBaseBackupCode = process.env.N_BASE_BACKUP_CODE || 3
const nMaxBackupCode = nBaseBackupCode < 10 ? nBaseBackupCode : 10


export class BackupCodeResponseGenerator extends BaseResponseGenerator {
  public data = data
  constructor() {
    super()
  }

  hashCode(account: string|number, codeRaw: string, secret: string = 'Go Braves'): string {
    return crypto.createHmac('sha256', secret)
      .update(`backup-code:${account}:${codeRaw}`)
      .digest('hex')
  }

  codeRegister(payload) {

    // validation process
    const validation = this.validatePayload(payload)

    // handle invalid
    if (!validation.valid) {
      return Bluebird.resolve(this.genServerResponse(this.genError('validation', validation.problems), 400))
    }
    // handle valid
    else {

      const u2fid = this.genU2fId(payload.appId, payload.account, payload.secret)

      const records: BackupCodeRecord[] = []
      const codes: string[] = []
      // generate N records
      while (records.length < nMaxBackupCode) {

        const constRaw = uuidv4().slice(-8)
        const code = this.hashCode(u2fid, constRaw, payload.secret)
        // should move this defination to an api.method for testing
        let record = {
          uuid: uuidv4(),
          u2fid,
          code,
        }
        records.push(record)
        codes.push(constRaw)
      }

      // SQL QUERY
      return this.data.create.records(records)
        .then((dbResponse: QueryReadByU2fIdCode) => {
          let info: any = codes
          return this.genServerResponse(info)
        })
        .catch(err => {
          return this.genServerResponse(this.genError('database', err), 500)
        })

    }

  }

  codeAuthenticate(payload) {

    // validation specs
    const specs = [
      { prop: 'code', positive: true }
    ]

    // validation process
    const validation = this.validatePayload(payload, specs)

    // handle invalid
    if (!validation.valid) {
      return Bluebird.resolve(this.genServerResponse(this.genError('validation', validation.problems), 400))
    }
    // handle valid
    else {
      // SQL QUERY | check code
      const u2fid = this.genU2fId(payload.appId, payload.account, payload.secret)
      const code = this.hashCode(u2fid, payload.code, payload.secret)
      return this.data.read.byU2fIdCode(u2fid, code)
        .then((dbResponse: QueryReadByU2fIdCode[]) => {
          if (dbResponse.length && dbResponse[0].uuid) {
            // delete code so it cannot be reused
            // SQL QUERY | delete code (single-use)
            return this.data.delete.byUuid(dbResponse[0].uuid)
              .then(dbResponse2 => {
                return this.genServerResponse(this.genAuthSuccess(u2fid))
              })
              .catch(err => {
                return this.genServerResponse(this.genError('database', err), 500)
              })
          }
          return this.genServerResponse(this.genAuthError(u2fid), 400)

        })
        .catch(err => {
          return this.genServerResponse(this.genError('database', err), 500)
        })
    }

  }

}

export const api = new BackupCodeResponseGenerator()
