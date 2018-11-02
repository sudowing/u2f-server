import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { fixtures as fix } from './u2f-key.fixtures'
import { api } from './u2f-key.responses'
import { data } from './u2f-key.queries'

const sandbox = sinon.createSandbox()

describe('U2F Key | API Responses', function() {

  beforeEach(function() {
    sandbox.spy(api, 'validatePayload')
  })

  afterEach(function () {
    sandbox.restore()
  })


  describe('data', function() {
    it('API model uses correct queries', () => {
      expect(api.data).to.exist.and.deep.equal(data)
    })
  })


  describe('keyRegisterStart', function() {
    it('validates input | bad payload', (done) => {
      let payload = {}

      Promise.resolve(api.keyRegisterStart(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyRegisterStart.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {
      sandbox.stub(api.u2f, 'request')
        .returns(fix.keyRegisterStart.output[1])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.resolve(fix.keyRegisterStart.output[2]))

      const payload = fix.keyRegisterStart.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.keyRegisterStart(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyRegisterStart.output[3])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

          sinon.assert.calledOnce(api.u2f.request)
          sinon.assert.calledWith(api.u2f.request,
            payload.appId
          )

          const cacheKey = `u2f.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            JSON.stringify(fix.keyRegisterStart.output[1])
          )


        })
        .then(done).catch(done)

    })

    it('error | cache', (done) => {
      sandbox.stub(api.u2f, 'request')
        .returns(fix.keyRegisterStart.output[1])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.reject(fix.keyRegisterStart.output[4]))

      const payload = fix.keyRegisterStart.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

      Promise.resolve(api.keyRegisterStart(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.keyRegisterStart.output[5])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

          sinon.assert.calledOnce(api.u2f.request)
          sinon.assert.calledWith(api.u2f.request,
            payload.appId
          )

          const cacheKey = `u2f.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            JSON.stringify(fix.keyRegisterStart.output[1])
          )


        })
        .then(done).catch(done)

    })

  })

  describe('keyRegisterFinish', function() {
    it('validates input | bad payload', (done) => {

      let payload = {}

      Promise.resolve(api.keyRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyRegisterFinish.output[0])
        })
        .then(() => {

          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRegisterFinish.input[2])


        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.keyRegisterFinish.output[1]))
      sandbox.stub(api.u2f, 'checkRegistration')
        .returns(fix.keyRegisterFinish.output[2])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.resolve(fix.keyRegisterFinish.output[4]))

      const payload = fix.keyRegisterFinish.input[1]

      Promise.resolve(api.keyRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res.payload).to.exist
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRegisterFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

          const cacheKey = `u2f.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )

          sinon.assert.calledOnce(api.u2f.checkRegistration)
          sinon.assert.calledWith(api.u2f.checkRegistration,
            fix.keyRegisterFinish.output[4],
            payload.registrationResponse
          )

          sinon.assert.calledOnce(api.data.create.record)


        })
        .then(done).catch(done)


    })

    it('error | cache', (done) => {
      sandbox.stub(api.cache, 'get')
        .returns(Promise.reject(fix.keyRegisterFinish.output[5]))
      sandbox.stub(api.u2f, 'checkRegistration')
        .returns(fix.keyRegisterFinish.output[2])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.resolve(fix.keyRegisterFinish.output[4]))

      const payload = fix.keyRegisterFinish.input[1]

      Promise.resolve(api.keyRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.keyRegisterFinish.output[7])

        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRegisterFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

          const cacheKey = `u2f.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )

        })
        .then(done).catch(done)


    })

    it('error | database', (done) => {
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.keyRegisterFinish.output[1]))
      sandbox.stub(api.u2f, 'checkRegistration')
        .returns(fix.keyRegisterFinish.output[2])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.reject(fix.keyRegisterFinish.output[5]))

      const payload = fix.keyRegisterFinish.input[1]

      Promise.resolve(api.keyRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.keyRegisterFinish.output[6])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRegisterFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

          const cacheKey = `u2f.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )

          sinon.assert.calledOnce(api.u2f.checkRegistration)
          sinon.assert.calledWith(api.u2f.checkRegistration,
            fix.keyRegisterFinish.output[4],
            payload.registrationResponse
          )

          sinon.assert.calledOnce(api.data.create.record)


        })
        .then(done).catch(done)


    })

    it('error | registration', (done) => {
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.keyRegisterFinish.output[1]))
      sandbox.stub(api.u2f, 'checkRegistration')
        .returns(fix.keyRegisterFinish.output[9])
      sandbox.stub(api.data.create, 'record')
        .returns(Promise.resolve(fix.keyRegisterFinish.output[5]))

      const payload = fix.keyRegisterFinish.input[1]

      Promise.resolve(api.keyRegisterFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.keyRegisterFinish.output[8])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRegisterFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

          const cacheKey = `u2f.reg.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )

          sinon.assert.calledOnce(api.u2f.checkRegistration)
          sinon.assert.calledWith(api.u2f.checkRegistration,
            fix.keyRegisterFinish.output[4],
            payload.registrationResponse
          )


        })
        .then(done).catch(done)


    })




  })


  describe('keyRemove', function() {
    it('validates input | bad payload', (done) => {
      let payload = {}

      Promise.resolve(api.keyRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyRemove.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRemove.input[2])


        })
        .then(done).catch(done)
    })

    it('serves correct api responses | record does not exists (no records)', (done) => {
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.resolve(fix.keyRemove.output[3]))

      const payload = fix.keyRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.keyRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyRemove.output[4])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRemove.input[2])

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

    it('serves correct api responses | record does not exists (multiple records)', (done) => {
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.resolve(fix.keyRemove.output[5]))

      const payload = fix.keyRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.keyRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyRemove.output[2])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRemove.input[2])

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

    it('serves correct api responses', (done) => {
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.resolve(fix.keyRemove.output[1]))

      const payload = fix.keyRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.keyRemove(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyRemove.output[2])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRemove.input[2])

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

    it('error | database', (done) => {
      sandbox.stub(api.data.delete, 'byU2fIdUuid')
        .returns(Promise.reject(fix.keyRemove.output[6]))

      const payload = fix.keyRemove.input[1]
      const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
      Promise.resolve(api.keyRemove(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.keyRemove.output[7])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyRemove.input[2])

          sinon.assert.calledOnce(api.data.delete.byU2fIdUuid)
          sinon.assert.calledWith(api.data.delete.byU2fIdUuid,
            u2fid,
            payload.uuid
          )

        })
        .then(done).catch(done)

    })

  })


  describe('keyAuthenticateStart', function() {
    it('validates input | bad payload', (done) => {
      let payload = {}

      Promise.resolve(api.keyAuthenticateStart(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyAuthenticateStart.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {
      sandbox.stub(api.data.read, 'byU2fId')
        .returns(Promise.resolve(fix.keyAuthenticateStart.output[3]))
      sandbox.stub(api.u2f, 'request')
        .returns(fix.keyAuthenticateStart.output[1])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.resolve(fix.keyAuthenticateStart.output[2]))


      const payload = fix.keyAuthenticateStart.input[1]



      Promise.resolve(api.keyAuthenticateStart(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res.payload).to.exist
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

          sinon.assert.calledOnce(api.data.read.byU2fId)
          sinon.assert.calledWith(api.data.read.byU2fId,
            u2fid
          )

          sinon.assert.calledOnce(api.u2f.request)
          sinon.assert.calledWith(api.u2f.request,
            payload.appId
          )

          const cacheKey = `u2f.auth.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            JSON.stringify(fix.keyAuthenticateStart.output[1])
          )

        })
        .then(done).catch(done)



    })

    it('error | datastore [cache]', (done) => {
      sandbox.stub(api.data.read, 'byU2fId')
        .returns(Promise.resolve(fix.keyAuthenticateStart.output[3]))
      sandbox.stub(api.u2f, 'request')
        .returns(fix.keyAuthenticateStart.output[1])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.reject(fix.keyAuthenticateStart.output[4]))


      const payload = fix.keyAuthenticateStart.input[1]

      Promise.resolve(api.keyAuthenticateStart(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.keyAuthenticateStart.output[5])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

          sinon.assert.calledOnce(api.data.read.byU2fId)
          sinon.assert.calledWith(api.data.read.byU2fId,
            u2fid
          )

          sinon.assert.calledOnce(api.u2f.request)
          sinon.assert.calledWith(api.u2f.request,
            payload.appId
          )

          const cacheKey = `u2f.auth.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            JSON.stringify(fix.keyAuthenticateStart.output[1])
          )

        })
        .then(done).catch(done)



    })

    it('error | datastore [database]', (done) => {
      sandbox.stub(api.data.read, 'byU2fId')
        .returns(Promise.reject(fix.keyAuthenticateStart.output[4]))
      sandbox.stub(api.u2f, 'request')
        .returns(fix.keyAuthenticateStart.output[1])
      sandbox.stub(api.cache, 'set')
        .returns(Promise.resolve(fix.keyAuthenticateStart.output[2]))


      const payload = fix.keyAuthenticateStart.input[1]

      Promise.resolve(api.keyAuthenticateStart(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.keyAuthenticateStart.output[5])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload)

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)

          sinon.assert.calledOnce(api.data.read.byU2fId)
          sinon.assert.calledWith(api.data.read.byU2fId,
            u2fid
          )

          sinon.assert.calledOnce(api.u2f.request)
          sinon.assert.calledWith(api.u2f.request,
            payload.appId
          )

          const cacheKey = `u2f.auth.${u2fid}`
          sinon.assert.calledOnce(api.cache.set)
          sinon.assert.calledWith(api.cache.set,
            cacheKey,
            JSON.stringify(fix.keyAuthenticateStart.output[1])
          )

        })
        .then(done).catch(done)



    })


  })

  describe('keyAuthenticateFinish', function() {

    beforeEach(function() {
      sandbox.stub(api._data.create, 'log')
        .returns(Promise.resolve(true))
    })

    it('validates input | bad payload', (done) => {
      let payload = {}

      Promise.resolve(api.keyAuthenticateFinish(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.keyAuthenticateFinish.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyAuthenticateFinish.input[2])

        })
        .then(done).catch(done)
    })

    it('serves correct api responses | AuthError', (done) => {
      sandbox.stub(api.data.read, 'byU2fIdKeyhandle')
        .returns(Promise.resolve(fix.keyAuthenticateFinish.output[3]))
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.keyAuthenticateFinish.output[5]))
      sandbox.stub(api.u2f, 'checkSignature')

      const payload = fix.keyAuthenticateFinish.input[1]

      Promise.resolve(api.keyAuthenticateFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.keyAuthenticateFinish.output[7])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyAuthenticateFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
          sinon.assert.calledOnce(api.data.read.byU2fIdKeyhandle)
          sinon.assert.calledWith(api.data.read.byU2fIdKeyhandle,
            u2fid
          )

          const cacheKey = `u2f.auth.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )

          sinon.assert.calledOnce(api.u2f.checkSignature)
          // sinon.assert.calledWith(api.u2f.checkSignature,
          //   fix.keyAuthenticateFinish.output[2],
          //   payload.registrationResponse,
          //   fix.keyAuthenticateFinish.output[3][0].public_key
          // )

          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)

        })
        .then(done).catch(done)




    })

    it('serves correct api responses', (done) => {
      sandbox.stub(api.data.read, 'byU2fIdKeyhandle')
        .returns(Promise.resolve(fix.keyAuthenticateFinish.output[3]))
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.keyAuthenticateFinish.output[1]))
      sandbox.stub(api.u2f, 'checkSignature')
        .returns(fix.keyAuthenticateFinish.output[4])

      const payload = fix.keyAuthenticateFinish.input[1]

      Promise.resolve(api.keyAuthenticateFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res.payload).to.exist
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyAuthenticateFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
          sinon.assert.calledOnce(api.data.read.byU2fIdKeyhandle)
          sinon.assert.calledWith(api.data.read.byU2fIdKeyhandle,
            u2fid
          )

          const cacheKey = `u2f.auth.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )

          sinon.assert.calledOnce(api.u2f.checkSignature)
          sinon.assert.calledWith(api.u2f.checkSignature,
            fix.keyAuthenticateFinish.output[2],
            payload.authResponse,
            fix.keyAuthenticateFinish.output[3][0].public_key
          )

          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)


        })
        .then(done).catch(done)




    })

    it('error | datastore [cache]', (done) => {
      sandbox.stub(api.data.read, 'byU2fIdKeyhandle')
        .returns(Promise.resolve(fix.keyAuthenticateFinish.output[3]))
      sandbox.stub(api.cache, 'get')
        .returns(Promise.reject(fix.keyAuthenticateFinish.output[8]))
      sandbox.stub(api.u2f, 'checkSignature')
        .returns(fix.keyAuthenticateFinish.output[4])

      const payload = fix.keyAuthenticateFinish.input[1]

      Promise.resolve(api.keyAuthenticateFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.to.eql(fix.keyAuthenticateFinish.output[9])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyAuthenticateFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
          sinon.assert.calledOnce(api.data.read.byU2fIdKeyhandle)
          sinon.assert.calledWith(api.data.read.byU2fIdKeyhandle,
            u2fid
          )

          const cacheKey = `u2f.auth.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )



        })
        .then(done).catch(done)




    })

    it('error | datastore [database]', (done) => {
      sandbox.stub(api.data.read, 'byU2fIdKeyhandle')
        .returns(Promise.reject(fix.keyAuthenticateFinish.output[8]))
      sandbox.stub(api.cache, 'get')
        .returns(Promise.resolve(fix.keyAuthenticateFinish.output[1]))
      sandbox.stub(api.u2f, 'checkSignature')
        .returns(fix.keyAuthenticateFinish.output[4])

      const payload = fix.keyAuthenticateFinish.input[1]

      Promise.resolve(api.keyAuthenticateFinish(payload))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.to.eql(fix.keyAuthenticateFinish.output[9])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.keyAuthenticateFinish.input[2])

          const u2fid = api.genU2fId(payload.appId, payload.account, payload.secret)
          sinon.assert.calledOnce(api.data.read.byU2fIdKeyhandle)
          sinon.assert.calledWith(api.data.read.byU2fIdKeyhandle,
            u2fid
          )

          const cacheKey = `u2f.auth.${u2fid}`
          sinon.assert.calledOnce(api.cache.get)
          sinon.assert.calledWith(api.cache.get,
            cacheKey
          )



        })
        .then(done).catch(done)




    })




  })


})
