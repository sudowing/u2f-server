import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { data } from './otp-device.queries'
import { fixtures as fix } from './otp-device.fixtures'

describe('One-Time Password | DB Data Object', function() {

  it('data.create.record', (done) => {
    const knexQuery = data.create.record(fix.newOtpRecord)
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.createRecord)
      })
      .then(done).catch(done)
  })

  it('data.read.byU2fId', (done) => {
    const knexQuery = data.read.byU2fId('byU2fId')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.readRecordsByU2fId)
      })
      .then(done).catch(done)
  })

  it('data.delete.byU2fIdUuid', (done) => {
    const knexQuery = data.delete.byU2fIdUuid('uuid', 'byU2fId')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.deleteRecordByU2fIdUuid)
      })
      .then(done).catch(done)
  })

})

