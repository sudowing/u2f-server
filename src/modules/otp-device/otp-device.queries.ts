import { db } from '../../app.network-resources'

function createRecord(record) {
  return db.insert(record).into('u2f.otp_device')
}

function readRecordsByU2fId(u2fid) {
  return db.from('u2f.otp_device')
    .select(['uuid', 'secret', 'nickname'])
    .where('otp_device.u2fid', u2fid)
}

function deleteRecordByU2fIdUuid(u2fid, uuid) {
  return db.from('u2f.otp_device')
    .where('otp_device.u2fid', u2fid)
    .andWhere('otp_device.uuid', uuid)
    .del()
}


export const data = {
  create: {
    record: createRecord
  },
  read: {
    byU2fId: readRecordsByU2fId
  },
  delete: {
    byU2fIdUuid: deleteRecordByU2fIdUuid
  }
}
