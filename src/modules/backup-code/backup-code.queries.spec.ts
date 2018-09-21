import { afterEach, assert, beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { data } from './backup-code.queries'
import { fixtures as fix } from './backup-code.fixtures'

describe('Backup Code | DB Data Object', function() {


  it('data.create.records', (done) => {

    const knexQuery = data.create.records(fix.newBackupCodes)

    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.createRecords)
      })
      .then(done).catch(done)
  })

  it('data.read.byU2fIdCode', (done) => {
    const knexQuery = data.read.byU2fIdCode('byU2fId', 'backupCode')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.readRecordsByU2fIdCode)
      })
      .then(done).catch(done)
  })

  it('data.delete.byUuid', (done) => {
    const knexQuery = data.delete.byUuid('universallyUniqueIdentification')
    Promise.resolve(knexQuery.toString())
      .then((sql) => {
        expect(sql).to.exist.and.eql(fix.deleteRecordByUuid)
      })
      .then(done).catch(done)
  })


})

