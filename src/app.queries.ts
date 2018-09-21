import * as uuidv4 from 'uuid/v4'
import { db } from './app.network-resources'

function readU2fKeysByU2fIdCode(u2fid) {
  return db.select([db.raw(`'u2f_key' as u2fType`), 'uuid', 'key_handle', 'version', 'nickname'])
    .from('u2f.u2f_key')
    .where('u2f_key.u2fid', u2fid)
}

function readBackupCodesByU2fIdCode(u2fid) {
  return db.count('uuid')
    .from('u2f.backup_code')
    .where('backup_code.u2fid', u2fid)
}

function readOtpDevicesByU2fIdCode(u2fid) {
  return db.select([db.raw(`'otp_device' as u2fType`), 'uuid', 'nickname'])
    .from('u2f.otp_device')
    .where('otp_device.u2fid', u2fid)
}

function createLog(record) {
  return db.insert(record).into('u2f.auth_log')
}

function readLogsByU2fId(u2fid) {
  return db.from('u2f.auth_log')
    .select('uuid', 'timestamp', 'auth_type', 'result')
    .where('auth_log.u2fid', u2fid)
}

export const data = {
  read: {
    u2fKeys: {
      byU2fId: readU2fKeysByU2fIdCode
    },
    backupCodes: {
      byU2fId: readBackupCodesByU2fIdCode
    },
    otpDevices: {
      byU2fId: readOtpDevicesByU2fIdCode
    },
    logs: {
      byU2fId: readLogsByU2fId
    }
  },
  create: {
    log: createLog
  }
}

