import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { fixtures as fix } from './app.fixtures'

import { BaseResponseGenerator } from './utils'
const api = new BaseResponseGenerator()

const sandbox = sinon.createSandbox()

describe('Root Level | Utilities', function() {

  beforeEach(function() {
    // sandbox.stub(jm, 'getInsurances')
    //   .returns(Promise.resolve(mockCase.getInsurances.response))

    // sandbox.stub(jm, 'lookupStarRatings')
    //   .returns(Promise.resolve({}))

  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('validatePayload', function() {

    it('prop exists', (done) => {
      const payload = {}
      const specs = [
        { prop: 'this' }
      ]

      Promise.resolve(api.validatePayload(payload, specs))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.validatePayload.output[0])
        })
        .then(done).catch(done)
    })

    it('prop exists and passes == test', (done) => {
      const payload = {
        this: 'this',
        that: null
      }
      const specs = [
        { prop: 'this' },
        { prop: 'that', positive: true }
      ]

      Promise.resolve(api.validatePayload(payload, specs))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.validatePayload.output[1])
        })
        .then(done).catch(done)
    })

    it('custom fn run on prop', (done) => {
      const payload = {
        this: 'this',
        that: 'that',
        other: 11
      }
      const specs = [
        { prop: 'this' },
        { prop: 'that', positive: true },
        { prop: 'other', fn: (n) => Math.pow(n, 2) === 144, fnMessage: 'Square Root must be 144' }
      ]

      Promise.resolve(api.validatePayload(payload, specs))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.validatePayload.output[2])
        })
        .then(done).catch(done)
    })

    it('validation succeeds', (done) => {
      const payload = {
        this: 'this',
        that: 'that',
        other: 12
      }
      const specs = [
        { prop: 'this' },
        { prop: 'that', positive: true },
        { prop: 'other', fn: (n) => Math.pow(n, 2) === 144, fnMessage: 'Square Root must be 144' }
      ]

      Promise.resolve(api.validatePayload(payload, specs))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.validatePayload.output[3])
        })
        .then(done).catch(done)
    })

  })

  describe('genServerResponse', function() {
    it('model method to generate API success res with payload', (done) => {
      Promise.resolve(api.genServerResponse(fix.genServerResponse.input))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.genServerResponse.output)
        })
        .then(done).catch(done)
    })

  })

  describe('genError', function() {
    it('model method to generate API error res with error payload & status code', (done) => {

      Promise.resolve(api.genError('authentication', 'Provided Credentials No Good.'))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.genError.output)
        })
        .then(done).catch(done)
    })

  })

  describe('genAuthError', function() {
    it('model method to generate API error res with auth error payload & status code', (done) => {

      sandbox.stub(api._data.create, 'log')
        .returns(Promise.resolve(true))

      Promise.resolve(api.genAuthError('u2fid'))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.genAuthError.output)
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)
        })
        .then(done).catch(done)
    })

  })

  describe('genAuthSuccess', function() {
    it('model method to generate API success res with auth payload', (done) => {

      sandbox.stub(api._data.create, 'log')
        .returns(Promise.resolve(true))

      Promise.resolve(api.genAuthSuccess('u2fid'))
        .then((res: any) => {
          expect(res).to.exist.and.eql(fix.genAuthSuccess.output[0])
        })
        .then(() => {
          // eval stubs & spies
          sinon.assert.calledOnce(api._data.create.log)
        })
        .then(done).catch(done)
    })

  })

  describe('genU2fId', function() {

    const appID = 'appID'
    const account = 'account'
    const secret = 'secret'

    it('prop exists', (done) => {

      Promise.resolve(api.genU2fId(appID, account, secret))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.genU2fId.output[0])
        })
        .then(done).catch(done)
    })

    it('prop exists | secret is optional', (done) => {

      Promise.resolve(api.genU2fId(appID, account))
        .then((res) => {
          expect(res).to.exist.and.eql(fix.genU2fId.output[1])
        })
        .then(done).catch(done)
    })


  })


  describe('genNickname', function() {


    it('prop exists', (done) => {

      Promise.resolve(api.genNickname('deviceType'))
        .then((res) => {
          expect(res).to.exist
          expect(res.startsWith(fix.genNickname.output[0]))
        })
        .then(done).catch(done)
    })

  })

})
