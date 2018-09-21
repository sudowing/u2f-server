import { db } from '../../app.network-resources'

function createRecord(record) {
  return db.insert(record).into('u2f.u2f_key')
}

function readRecordsByU2fId(u2fid) {
  return db.from('u2f.u2f_key')
    .select(['uuid', 'key_handle as keyHandle', 'version', 'nickname'])
    .where('u2f_key.u2fid', u2fid)
}

function readRecordsByU2fIdKeyhandle(u2fid, keyHandle) {
  return db.from('u2f.u2f_key')
    .select(['key_handle as keyHandle', 'public_key', 'version'])
    .where('u2f_key.u2fid', u2fid)
    .andWhere('u2f_key.key_handle', keyHandle)
}

function deleteRecordByU2fIdUuid(u2fid, uuid) {
  return db.from('u2f.u2f_key')
    .where('u2f_key.u2fid', u2fid)
    .andWhere('u2f_key.uuid', uuid)
    .del()
}

export const data = {
  create: {
    record: createRecord
  },
  read: {
    byU2fId: readRecordsByU2fId,
    byU2fIdKeyhandle: readRecordsByU2fIdKeyhandle
  },
  delete: {
    byU2fIdUuid: deleteRecordByU2fIdUuid
  }
}
