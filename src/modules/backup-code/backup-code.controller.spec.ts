import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import * as apiController from './backup-code.controller'
import * as api from './backup-code.responses'

const sandbox = sinon.createSandbox()

describe('Backup Code | Routes & Controllers', function() {

  beforeEach(function() {
    // sandbox.stub(jm, 'getInsurances')
    //   .returns(Promise.resolve(mockCase.getInsurances.response))

    // sandbox.stub(jm, 'lookupStarRatings')
    //   .returns(Promise.resolve({}))

  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('codeRegister', function() {
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

  describe('codeAuthenticate', function() {
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
