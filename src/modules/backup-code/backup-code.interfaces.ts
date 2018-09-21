export interface QueryReadByU2fIdCode {
  uuid: string
}

export interface BackupCodeRecord {
  uuid: string,
  u2fid: string,
  code: string
}
