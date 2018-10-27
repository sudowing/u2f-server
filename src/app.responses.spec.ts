import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { fixtures as fix } from './app.fixtures'

import { api } from './app.responses'
import { data } from './app.queries'

const sandbox = sinon.createSandbox()

describe('Root Level | API Responses', function() {

  beforeEach(function() {
    sandbox.spy(api, '_validatePayload')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('data', function() {
    it('API model uses correct queries', () => {
      expect(api.data).to.exist.and.deep.equal(data)
    })
  })

  describe('mfaStatus', function() {

    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      let payload = {}

      Promise.resolve(api.mfaStatus(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.mfaStatus.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

          // eval stubs & spies
          sinon.assert.calledOnce(api._validatePayload)
          sinon.assert.calledWith(api._validatePayload, payload,
            fix.mfaStatus.output[1]
          )

        })
        .then(done).catch(done)
    })

    it('valid request | generates API response | all true', (done) => {
      sandbox.stub(api.data.read.u2fKeys, 'byU2fId')
        .returns(Promise.resolve(fix.u2fKeys.output[0]))
      sandbox.stub(api.data.read.backupCodes, 'byU2fId')
        .returns(Promise.resolve(fix.backupCodes.output[0]))
      sandbox.stub(api.data.read.otpDevices, 'byU2fId')
        .returns(Promise.resolve(fix.otpDevices.output[0]))

      const payload = fix.mfaStatus.input[0]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.mfaStatus(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res).to.exist.and.eql(fix.mfaStatus.output[2])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.read.u2fKeys.byU2fId)
          sinon.assert.calledWith(
            api.data.read.u2fKeys.byU2fId,
            u2fid
          )
          sinon.assert.calledOnce(api.data.read.backupCodes.byU2fId)
          sinon.assert.calledWith(
            api.data.read.backupCodes.byU2fId,
            u2fid
          )
          sinon.assert.calledOnce(api.data.read.otpDevices.byU2fId)
          sinon.assert.calledWith(
            api.data.read.otpDevices.byU2fId,
            u2fid
          )
        })
        .then(done).catch(done)
    })

    it('valid request | generates API response | all false', (done) => {
      sandbox.stub(api.data.read.u2fKeys, 'byU2fId')
        .returns(Promise.resolve(fix.u2fKeys.output[1]))
      sandbox.stub(api.data.read.backupCodes, 'byU2fId')
        .returns(Promise.resolve(fix.backupCodes.output[1]))
      sandbox.stub(api.data.read.otpDevices, 'byU2fId')
        .returns(Promise.resolve(fix.otpDevices.output[1]))

      const payload = fix.mfaStatus.input[0]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.mfaStatus(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res).to.exist.and.eql(fix.mfaStatus.output[3])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.read.u2fKeys.byU2fId)
          sinon.assert.calledWith(
            api.data.read.u2fKeys.byU2fId,
            u2fid
          )
          sinon.assert.calledOnce(api.data.read.backupCodes.byU2fId)
          sinon.assert.calledWith(
            api.data.read.backupCodes.byU2fId,
            u2fid
          )
          sinon.assert.calledOnce(api.data.read.otpDevices.byU2fId)
          sinon.assert.calledWith(
            api.data.read.otpDevices.byU2fId,
            u2fid
          )
        })
        .then(done).catch(done)
    })

    it('error | database', (done) => {
      sandbox.stub(api.data.read.u2fKeys, 'byU2fId')
        .returns(Promise.reject(fix.mfaStatus.output[4]))
      sandbox.stub(api.data.read.backupCodes, 'byU2fId')
        .returns(Promise.reject(fix.mfaStatus.output[4]))
      sandbox.stub(api.data.read.otpDevices, 'byU2fId')
        .returns(Promise.reject(fix.mfaStatus.output[4]))

      const payload = fix.mfaStatus.input[0]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.mfaStatus(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.mfaStatus.output[5])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.read.u2fKeys.byU2fId)
          sinon.assert.calledWith(
            api.data.read.u2fKeys.byU2fId,
            u2fid
          )
          sinon.assert.calledOnce(api.data.read.backupCodes.byU2fId)
          sinon.assert.calledWith(
            api.data.read.backupCodes.byU2fId,
            u2fid
          )
          sinon.assert.calledOnce(api.data.read.otpDevices.byU2fId)
          sinon.assert.calledWith(
            api.data.read.otpDevices.byU2fId,
            u2fid
          )
        })
        .then(done).catch(done)
    })

  })



  describe('mfaLogs', function() {

    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      let payload = {}

      Promise.resolve(api.mfaLogs(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.mfaLogs.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

          // eval stubs & spies
          sinon.assert.calledOnce(api._validatePayload)
          sinon.assert.calledWith(api._validatePayload, payload,
            fix.mfaLogs.input[0]
          )

        })
        .then(done).catch(done)
    })

    it('valid request | generates API response', (done) => {
      sandbox.stub(api.data.read.logs, 'byU2fId')
        .returns(Promise.resolve(fix.mfaLogs.output[1]))

      const payload = fix.mfaLogs.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.mfaLogs(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res.payload).to.exist.and.eql(fix.mfaLogs.output[1])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.read.logs.byU2fId)
          sinon.assert.calledWith(
            api.data.read.logs.byU2fId,
            u2fid
          )
        })
        .then(done).catch(done)
    })

    it('error | database', (done) => {
      sandbox.stub(api.data.read.logs, 'byU2fId')
        .returns(Promise.reject(fix.mfaLogs.output[2]))

      const payload = fix.mfaLogs.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.mfaLogs(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.mfaLogs.output[3])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.read.logs.byU2fId)
          sinon.assert.calledWith(
            api.data.read.logs.byU2fId,
            u2fid
          )
        })
        .then(done).catch(done)
    })


  })









  describe('swagger', function() {

    it('generates API response', (done) => {

      Promise.resolve(api.swagger())
        .then((res) => {
          // eval response
          const swaggerKeys = [
            'swagger', 'info', 'host',
            'tags',
            'paths',
            'definitions', 'externalDocs'
          ]
          expect(res.statusCode).to.exist.and.eql(200)
          expect(Object.keys(res.payload)).to.exist.and.eql(swaggerKeys)
        })
        .then(done).catch(done)
    })

  })


})
