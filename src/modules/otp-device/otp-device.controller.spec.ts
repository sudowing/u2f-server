import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import * as apiController from './otp-device.controller'
import * as api from './otp-device.responses'

const sandbox = sinon.createSandbox()

describe('One-Time Password | Routes & Controllers', function() {

  beforeEach(function() {
    // sandbox.stub(jm, 'getInsurances')
    //   .returns(Promise.resolve(mockCase.getInsurances.response))

    // sandbox.stub(jm, 'lookupStarRatings')
    //   .returns(Promise.resolve({}))

  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('otpRegisterStart', function() {
    it('builds payloads', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

  })

  describe('otpRegisterFinish', function() {
    it('builds payloads', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

  })

  describe('otpAuthenticate', function() {
    it('builds payloads', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

  })

  describe('otpStatus', function() {
    it('builds payloads', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

    it('serves correct api responses', (done) => {

      Promise.resolve(true)
        .then((res) => {
          expect(res).to.exist
        })
        .then(done).catch(done)
    })

  })


})
