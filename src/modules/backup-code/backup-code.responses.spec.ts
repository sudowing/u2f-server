import * as Bluebird from 'bluebird'
import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { fixtures as fix } from './backup-code.fixtures'
import { api } from './backup-code.responses'
import { data } from './backup-code.queries'

const sandbox = sinon.createSandbox()

describe('Backup Code | API Responses', function() {

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


  describe('hashCode', function() {
    it('hashCode', (done) => {

      Promise.resolve(api.hashCode(fix.hashCode.input[0], fix.hashCode.input[1], fix.hashCode.input[2]))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.hashCode.output[0])
        })
        .then(done).catch(done)
    })
  })


  describe('codeRegister', function() {
    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      let payload = {}

      Promise.resolve(api.codeRegister(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.codeRegister.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.codeRegister.input[0])
        })
        .then(done).catch(done)
    })

    it('valid request | generates API response', (done) => {
      sandbox.spy(api, 'hashCode')
      sandbox.stub(api.data.create, 'records')
        .returns(Promise.resolve(fix.codeRegister.output[1]))

      Promise.resolve(api.codeRegister(fix.codeRegister.input[1]))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res.payload).to.exist.and.be.an('array')
          expect(res.payload[0]).to.exist.and.be.an('string')
          // expect(res.payload.length).to.exist.and.eql(4)
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.called(api.hashCode)
          sinon.assert.calledOnce(api.data.create.records)
          // can test calledWith after record generation moved to api.method
        })
        .then(done).catch(done)
    })

    it('err | database', (done) => {
      sandbox.stub(api.data.create, 'records')
        .returns(Promise.reject(fix.codeRegister.output[2]))

      Promise.resolve(api.codeRegister(fix.codeRegister.input[1]))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.codeRegister.output[3])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.create.records)
          // can test calledWith after record generation moved to api.method
        })
        .then(done).catch(done)
    })

  })

  describe('codeAuthenticate', function() {

    beforeEach(function() {
      sandbox.stub(api._data.create, 'log')
        .returns(Promise.resolve(true))
    })

    it('validates input | bad payload', (done) => {
      sandbox.spy(api, 'validatePayload')
      // api.data.read.byU2fIdCode(payload.appId, payload.account, payload.code) // stubThis
      // api.data.delete.byUuid(dbResponse[0].uuid) // stubThis

      let payload = {}

      Promise.resolve(api.codeAuthenticate(payload))
        .then((res) => {
          // eval response
          expect(res).to.exist.and.eql(fix.codeAuthenticate.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.validatePayload)
          sinon.assert.calledWith(api.validatePayload, payload, fix.codeAuthenticate.input[0])
        })
        .then(done).catch(done)
    })

    it('valid request | generates API response | AuthError', (done) => {
      sandbox.spy(api, 'hashCode')
      sandbox.stub(api.data.read, 'byU2fIdCode')
        .returns(Bluebird.resolve([]))

      Promise.resolve(api.codeAuthenticate(fix.codeAuthenticate.input[1]))
        .then((res) => {
          // eval response
          expect(res.statusCode).to.exist.and.eql(400)
          expect(res).to.exist.and.eql(fix.codeAuthenticate.output[1])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.hashCode)
          sinon.assert.calledOnce(api.data.read.byU2fIdCode)

          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)

        })
        .then(done).catch(done)
    })

    it('valid request | generates API response', (done) => {
      sandbox.spy(api, 'hashCode')
      sandbox.stub(api.data.read, 'byU2fIdCode')
        .returns(Bluebird.resolve(fix.codeAuthenticate.output[2]))
      sandbox.stub(api.data.delete, 'byUuid')
        .returns(Bluebird.resolve(fix.codeAuthenticate.output[3]))

      Promise.resolve(api.codeAuthenticate(fix.codeAuthenticate.input[2]))
        .then((res) => {
          // eval response
          expect(res).to.exist
          expect(res.statusCode).to.exist.and.eql(200)
          expect(res.payload).to.exist
          // expect(res.payload.jwt).to.exist.and.to.be.a('string')
          // // ensure it is a jwt
          // expect(res.payload.jwt.split('.').length - 1).to.eql(2)
          // expect(res.payload.timestamp).to.exist.and.to.be.a('number')
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.hashCode)
          sinon.assert.calledOnce(api.data.read.byU2fIdCode)
          sinon.assert.calledOnce(api.data.delete.byUuid)
          sinon.assert.calledWith(api.data.delete.byUuid,
            fix.codeAuthenticate.output[2][0].uuid
          )

          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)

        })
        .then(done).catch(done)
    })

    it('error | database READ', (done) => {
      sandbox.stub(api.data.read, 'byU2fIdCode')
        .returns(Bluebird.reject(fix.codeAuthenticate.output[4]))
      sandbox.stub(api.data.delete, 'byUuid')
        .returns(Bluebird.resolve(fix.codeAuthenticate.output[3]))

      Promise.resolve(api.codeAuthenticate(fix.codeAuthenticate.input[2]))
        .then((res) => {
          // eval response
          expect(res).to.exist
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.codeAuthenticate.output[5])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.read.byU2fIdCode)

        })
        .then(done).catch(done)
    })

    it('error | database DELETE', (done) => {
      sandbox.stub(api.data.read, 'byU2fIdCode')
        .returns(Bluebird.resolve(fix.codeAuthenticate.output[2]))
      sandbox.stub(api.data.delete, 'byUuid')
        .returns(Bluebird.reject(fix.codeAuthenticate.output[4]))

      Promise.resolve(api.codeAuthenticate(fix.codeAuthenticate.input[2]))
        .then((res) => {
          // eval response
          expect(res).to.exist
          expect(res.statusCode).to.exist.and.eql(500)
          expect(res).to.exist.and.eql(fix.codeAuthenticate.output[5])
          // expect(res.payload.jwt).to.exist.and.to.be.a('string')
          // // ensure it is a jwt
          // expect(res.payload.jwt.split('.').length - 1).to.eql(2)
          // expect(res.payload.timestamp).to.exist.and.to.be.a('number')
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api.data.read.byU2fIdCode)
          sinon.assert.calledOnce(api.data.delete.byUuid)
          sinon.assert.calledWith(api.data.delete.byUuid,
            fix.codeAuthenticate.output[2][0].uuid
          )

        })
        .then(done).catch(done)
    })


  })

})
