const createSchema_u2f = `
  CREATE SCHEMA u2f;
`

const createTable_u2f_key = `
  CREATE TABLE u2f.u2f_key(
      uuid UUID PRIMARY KEY,
      timestamp TIMESTAMP with time zone default CURRENT_TIMESTAMP not null,
      u2fid varchar(64) NOT NULL,
      key_handle TEXT NOT NULL,
      public_key TEXT NOT NULL,
      version TEXT NOT NULL,
      nickname varchar(64) NOT NULL
  );
`

const createTable_backup_code = `
  CREATE TABLE u2f.backup_code(
      uuid UUID PRIMARY KEY,
      timestamp TIMESTAMP with time zone default CURRENT_TIMESTAMP not null,
      u2fid varchar(64) NOT NULL,
      code VARCHAR (64) NOT NULL,
      CONSTRAINT unq_backupcode_app_key UNIQUE (u2fid, code)
  );
`

const createTable_otp_device = `
  CREATE TABLE u2f.otp_device(
      uuid UUID PRIMARY KEY,
      timestamp TIMESTAMP with time zone default CURRENT_TIMESTAMP not null,
      u2fid varchar(64) NOT NULL,
      secret VARCHAR (32) NOT NULL,
      nickname varchar(64) NOT NULL
  );
`

const createTable_auth_log = `
  CREATE TABLE u2f.auth_log(
    uuid UUID PRIMARY KEY,
    timestamp TIMESTAMP with time zone default CURRENT_TIMESTAMP not null,
    u2fid varchar(64) NOT NULL,
    auth_type varchar(64) NOT NULL,
    result boolean not null
  );
`


exports.up = function(knex, Promise) {
  return knex.schema
    .raw(createSchema_u2f)
    .raw(createTable_u2f_key)
    .raw(createTable_backup_code)
    .raw(createTable_otp_device)
    .raw(createTable_auth_log)
}

exports.down = function(knex, Promise) {
  
}
