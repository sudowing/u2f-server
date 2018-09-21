import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { fixtures as fix } from './otp-device.fixtures'
import { api } from './otp-device.responses'
import { data } from './otp-device.queries'

const sandbox = sinon.createSandbox()

describe('One-Time Password | API Responses', function() {

  beforeEach(function() {

  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('data', function() {
    it('API model uses correct queries', () => {
      expect(api.data).to.exist.and.deep.equal(data)
    })
  })

  describe('otpRegisterStart', function() {
    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      let payload = {}

      Promise.resolve(api.otpRegisterStart(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpRegisterStart.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.otpRegisterStart.input[0])
        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {
      sandbox.spy(api, '_otpSelectModel')
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.authenticator, 'generateSecret')
        .returns(fix.otpRegisterStart.output[2])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.resolve(fix.otpRegisterStart.output[3]))
      sandbox.stub(api.authenticator, 'keyuri')
        .returns(fix.otpRegisterStart.output[4])
      sandbox.spy(api, 'qrCodeDataURL')

      const payload = fix.otpRegisterStart.input[1]

      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.otpRegisterStart(payload))
        .then((res) => {
          // eval response
          expect(res.payload).to.exist.and.eql(fix.otpRegisterStart.output[5])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            payload.type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRegisterStart.input[0]
          )
          sinon.assert.calledOnce(api.authenticator.generateSecret)

          const cacheKey = `otp.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            fix.otpRegisterStart.output[2]
          )

          sinon.assert.calledOnce(api.authenticator.keyuri)
          sinon.assert.calledWith(api.authenticator.keyuri,
            payload.account,
            payload.appId,
            fix.otpRegisterStart.output[2]
          )
          sinon.assert.calledOnce(api.qrCodeDataURL)

        })
        .then(done).catch(done)

    })

    it('error | database', (done) => {
      sandbox.spy(api, '_otpSelectModel')
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.authenticator, 'generateSecret')
        .returns(fix.otpRegisterStart.output[2])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.reject(fix.otpRegisterStart.output[6]))
      sandbox.stub(api.authenticator, 'keyuri')
        .returns(fix.otpRegisterStart.output[4])
      sandbox.spy(api, 'qrCodeDataURL')

      const payload = fix.otpRegisterStart.input[1]

      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.otpRegisterStart(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpRegisterStart.output[7])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            payload.type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRegisterStart.input[0]
          )
          sinon.assert.calledOnce(api.authenticator.generateSecret)

          const cacheKey = `otp.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            fix.otpRegisterStart.output[2]
          )

        })
        .then(done).catch(done)

    })


    it('error | qrcode', (done) => {
      sandbox.spy(api, '_otpSelectModel')
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.authenticator, 'generateSecret')
        .returns(fix.otpRegisterStart.output[2])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.resolve(fix.otpRegisterStart.output[3]))
      sandbox.stub(api.authenticator, 'keyuri')
        .returns(fix.otpRegisterStart.output[4])
      sandbox.stub(api, 'qrCodeDataURL')
        .returns(Promise.reject(fix.otpRegisterStart.output[6]))

      const payload = fix.otpRegisterStart.input[1]

      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.otpRegisterStart(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpRegisterStart.output[8])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            payload.type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRegisterStart.input[0]
          )
          sinon.assert.calledOnce(api.authenticator.generateSecret)

          const cacheKey = `otp.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            fix.otpRegisterStart.output[2]
          )

          sinon.assert.calledOnce(api.authenticator.keyuri)
          sinon.assert.calledWith(api.authenticator.keyuri,
            payload.account,
            payload.appId,
            fix.otpRegisterStart.output[2]
          )
          sinon.assert.calledOnce(api.qrCodeDataURL)

        })
        .then(done).catch(done)

    })


  })

  describe('otpRegisterFinish', function() {
    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      let payload = {}

      Promise.resolve(api.otpRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpRegisterFinish.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.otpRegisterFinish.input[0])
        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {

      sandbox.spy(api, '_otpSelectModel')
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.otpRegisterFinish.output[1]))
      sandbox.stub(api.authenticator, 'check')
        .returns(fix.otpRegisterFinish.output[2])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.resolve(fix.otpRegisterFinish.output[3]))

      let payload = fix.otpRegisterFinish.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.otpRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpRegisterFinish.output[4])
        })
        .then(() => {
          // eval stubs & spies

          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            fix.otpRegisterFinish.input[1].type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRegisterFinish.input[0]
          )

          const cacheKey = `otp.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get, cacheKey)

          sinon.assert.calledOnce(api.authenticator.check)
          sinon.assert.calledWith(api.authenticator.check,
            fix.otpRegisterFinish.input[1].token,
            fix.otpRegisterFinish.output[1]
          )

          sinon.assert.calledOnce(api.data.create.record)

        })
        .then(done).catch(done)
    })

    it('error | cache', (done) => {

      sandbox.spy(api, '_otpSelectModel')
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.cache, 'get')
        .returns(Promise.reject(fix.otpRegisterFinish.output[5]))
      sandbox.stub(api.authenticator, 'check')
        .returns(fix.otpRegisterFinish.output[2])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.resolve(fix.otpRegisterFinish.output[3]))

      let payload = fix.otpRegisterFinish.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.otpRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpRegisterFinish.output[6])
        })
        .then(() => {
          // eval stubs & spies

          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            fix.otpRegisterFinish.input[1].type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRegisterFinish.input[0]
          )

          const cacheKey = `otp.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get, cacheKey)


        })
        .then(done).catch(done)
    })

    it('error | database', (done) => {

      sandbox.spy(api, '_otpSelectModel')
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.otpRegisterFinish.output[1]))
      sandbox.stub(api.authenticator, 'check')
        .returns(fix.otpRegisterFinish.output[2])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.reject(fix.otpRegisterFinish.output[5]))

      let payload = fix.otpRegisterFinish.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.otpRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpRegisterFinish.output[7])
        })
        .then(() => {
          // eval stubs & spies

          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            fix.otpRegisterFinish.input[1].type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRegisterFinish.input[0]
          )

          const cacheKey = `otp.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get, cacheKey)

          sinon.assert.calledOnce(api.authenticator.check)
          sinon.assert.calledWith(api.authenticator.check,
            fix.otpRegisterFinish.input[1].token,
            fix.otpRegisterFinish.output[1]
          )

        })
        .then(done).catch(done)
    })

    it('error | registration', (done) => {

      sandbox.spy(api, '_otpSelectModel')
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.otpRegisterFinish.output[1]))
      sandbox.stub(api.authenticator, 'check')
        .returns(fix.otpRegisterFinish.output[9])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.resolve(fix.otpRegisterFinish.output[3]))

      let payload = fix.otpRegisterFinish.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.otpRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpRegisterFinish.output[8])
        })
        .then(() => {
          // eval stubs & spies

          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            fix.otpRegisterFinish.input[1].type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRegisterFinish.input[0]
          )

          const cacheKey = `otp.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get, cacheKey)

          sinon.assert.calledOnce(api.authenticator.check)
          sinon.assert.calledWith(api.authenticator.check,
            fix.otpRegisterFinish.input[1].token,
            fix.otpRegisterFinish.output[1]
          )

        })
        .then(done).catch(done)
    })



  })


  describe('otpRemove', function() {
    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      let payload = {}

      Promise.resolve(api.otpRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpRemove.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.otpRemove.input[0])
        })
        .then(done).catch(done)
    })

    it('serves correct api responses | record does not exists (no records)', (done) => {
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.resolve(fix.otpRemove.output[3]))

      const payload = fix.otpRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.otpRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpRemove.output[4])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRemove.input[0]
          )

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

    it('serves correct api responses | record does not exists (multiple records)', (done) => {
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.resolve(fix.otpRemove.output[5]))

      const payload = fix.otpRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.otpRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpRemove.output[2])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRemove.input[0]
          )

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

    it('serves correct api responses', (done) => {
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.resolve(fix.otpRemove.output[1]))

      const payload = fix.otpRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.otpRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpRemove.output[2])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRemove.input[0]
          )

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

    it('error | database', (done) => {
      sandbox.spy(api, 'validatePayload')
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.reject(fix.otpRemove.output[6]))

      const payload = fix.otpRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.otpRemove(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpRemove.output[7])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpRemove.input[0]
          )

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

  })



  describe('otpAuthenticate', function() {
    beforeEach(function() {
      sandbox.stub(api._data.create, 'log')
        .returns(Promise.resolve(true))
    })

    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      let payload = {}

      Promise.resolve(api.otpAuthenticate(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.otpAuthenticate.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.otpAuthenticate.input[0])
        })
        .then(done).catch(done)
    })

    it('serves correct api responses | AuthError', (done) => {

      sandbox.spy(api, 'validatePayload')
      sandbox.spy(api, '_otpSelectModel')

      sandbox.stub(api.data.read, 'byU2fId')
        .returns(Promise.resolve(fix.otpAuthenticate.output[1]))

      sandbox.stub(api.authenticator, 'check')
        .returns(fix.otpAuthenticate.output[3])

      let payload = fix.otpAuthenticate.input[1]

      Promise.resolve(api.otpAuthenticate(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpAuthenticate.output[4])
        })
        .then(() => {
          // eval stubs & spies

          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            fix.otpAuthenticate.input[1].type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpAuthenticate.input[0]
          )

          sinon.assert.calledOnce(api.authenticator.check)
          sinon.assert.calledWith(api.authenticator.check,
            fix.otpAuthenticate.input[1].token,
            fix.otpAuthenticate.output[1][0].secret
          )

          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)

        })
        .then(done).catch(done)

    })

    it('serves correct api responses', (done) => {

      sandbox.spy(api, 'validatePayload')
      sandbox.spy(api, '_otpSelectModel')

      sandbox.stub(api.data.read, 'byU2fId')
        .returns(Promise.resolve(fix.otpAuthenticate.output[1]))

      sandbox.stub(api.authenticator, 'check')
        .returns(fix.otpAuthenticate.output[2])

      let payload = fix.otpAuthenticate.input[1]

      Promise.resolve(api.otpAuthenticate(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
        })
        .then(() => {
          // eval stubs & spies

          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            fix.otpAuthenticate.input[1].type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpAuthenticate.input[0]
          )

          sinon.assert.calledOnce(api.authenticator.check)
          sinon.assert.calledWith(api.authenticator.check,
            fix.otpAuthenticate.input[1].token,
            fix.otpAuthenticate.output[1][0].secret
          )

          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)

        })
        .then(done).catch(done)

    })

    it('error | database', (done) => {

      sandbox.spy(api, 'validatePayload')
      sandbox.spy(api, '_otpSelectModel')

      sandbox.stub(api.data.read, 'byU2fId')
        .returns(Promise.reject(fix.otpAuthenticate.output[5]))

      sandbox.stub(api.authenticator, 'check')
        .returns(fix.otpAuthenticate.output[2])

      let payload = fix.otpAuthenticate.input[1]

      Promise.resolve(api.otpAuthenticate(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.otpAuthenticate.output[6])
        })
        .then(() => {
          // eval stubs & spies

          sinon.assert.calledOnce(api._otpSelectModel)
          sinon.assert.calledWith(api._otpSelectModel,
            fix.otpAuthenticate.input[1].type
          )

          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload,
            payload,
            fix.otpAuthenticate.input[0]
          )

        })
        .then(done).catch(done)

    })

  })

})
