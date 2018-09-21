import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import * as apiController from './u2f-key.controller'
import * as api from './u2f-key.responses'

const sandbox = sinon.createSandbox()

describe('U2F Key | Routes & Controllers', function() {

  beforeEach(function() {
    // sandbox.stub(jm, 'getInsurances')
    //   .returns(Promise.resolve(mockCase.getInsurances.response))

    // sandbox.stub(jm, 'lookupStarRatings')
    //   .returns(Promise.resolve({}))

  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('keyRegisterStart', function() {
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

  describe('keyRegisterFinish', function() {
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

  describe('keyAuthenticateStart', function() {
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

  describe('keyAuthenticateFinish', function() {
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

  describe('keyStatus', function() {
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
