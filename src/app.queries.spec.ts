import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { fixtures as fix } from './app.fixtures'
import { data } from './app.queries'


describe('Root Level | DB Data Object', function() {

  it('read.backupCodes.byU2fId', (done) => {
    const knexQuery = data.read.backupCodes.byU2fId('byU2fId')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.readBackupCodesByU2fIdCode)
      })
      .then(done).catch(done)
  })

  it('read.otpDevices.byU2fId', (done) => {
    const knexQuery = data.read.otpDevices.byU2fId('byU2fId')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.readOtpDevicesByU2fIdCode)
      })
      .then(done).catch(done)
  })

  it('read.u2fKeys.byU2fId', (done) => {
    const knexQuery = data.read.u2fKeys.byU2fId('byU2fId')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.readU2fKeysByU2fIdCode)
      })
      .then(done).catch(done)
  })


  it('read.logs.byU2fId', (done) => {
    const knexQuery = data.read.logs.byU2fId('byU2fId')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.readLogsByU2fId)
      })
      .then(done).catch(done)
  })


  it('create.log', (done) => {
    const knexQuery = data.create.log(fix.createLog.input[0])
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.createLog.output[0])
      })
      .then(done).catch(done)
  })



})
