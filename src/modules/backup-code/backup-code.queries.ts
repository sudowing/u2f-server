import { db } from '../../app.network-resources'
import {
  QueryReadByU2fIdCode,
  BackupCodeRecord
} from './backup-code.interfaces'

function createRecords(records: BackupCodeRecord[]) {
  return db.insert(records, 'uuid').into('u2f.backup_code')
}

function readRecordsByU2fIdCode(u2fid: string, code: string) {
  return db.from('u2f.backup_code')
    .select(['uuid'])
    .where('backup_code.u2fid', u2fid)
    .andWhere('backup_code.code', code)
}

function deleteRecordByUuid(uuid: string) {
  return db.from('u2f.backup_code')
    .where('backup_code.uuid', uuid)
    .del()
}

export const data = {
  create: {
    records: createRecords
  },
  read: {
    byU2fIdCode: readRecordsByU2fIdCode
  },
  delete: {
    byUuid: deleteRecordByUuid
  }
}