export const fixtures: any = {}

const createRecords = `insert into "u2f"."backup_code" ("account", "appid", "code", "uuid") values ('accountId', 'appId', 'codeAlpha', 'idAlpha'), ('accountId', 'appId', 'codeBravo', 'idBravo'), ('accountId', 'appId', 'codeCharlie', 'idCharlie'), ('accountId', 'appId', 'codeDelta', 'idDelta') returning "uuid"`
fixtures.createRecords = createRecords

const readRecordsByU2fIdCode = `select "uuid" from "u2f"."backup_code" where "backup_code"."u2fid" = 'byU2fId' and "backup_code"."code" = 'backupCode'`
fixtures.readRecordsByU2fIdCode = readRecordsByU2fIdCode

const deleteRecordByUuid = `delete from "u2f"."backup_code" where "backup_code"."uuid" = 'universallyUniqueIdentification'`
fixtures.deleteRecordByUuid = deleteRecordByUuid

const newBackupCodes = [
  ['idAlpha', 'codeAlpha'],
  ['idBravo', 'codeBravo'],
  ['idCharlie', 'codeCharlie'],
  ['idDelta', 'codeDelta']
].map(([uuid, code]) => {
  return { uuid, appid: 'appId', account: 'accountId', code }
})
fixtures.newBackupCodes = newBackupCodes

fixtures.hashCode = {
  input: [
    'alpha',
    'bravo',
    'charlie',
  ],
  output: [
    'f874e35ae34ea8f03257421d58764f46212fd0ccb5c361e4b1798a81c8fd0219'
  ]
}

fixtures.codeRegister = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'robot',
      secret: 'secret'
    }
  ],
  output: [
    {
      statusCode: 400,
      payload: {
        error: 'validation',
        detail: [
          {
            prop: 'appId',
            message: 'Field Required'
          },
          {
            prop: 'account',
            message: 'Field Required'
          },
          {
            prop: 'secret',
            message: 'Field Required'
          }
        ]
      }
    },
    true,
    'sample error string',
    {
      'statusCode': 500,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    }
  ]
}


fixtures.codeAuthenticate = {
  input: [
    [
      { prop: 'code', positive: true }
    ],
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'code', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'robot',
      secret: 'secret',
      code: 'not-a-code'
    },
    {
      appId: 'https://example.com',
      account: 'robot',
      secret: 'secret',
      code: 'd8e7d1cc' // valid code
    }
  ],
  output: [
    {
      statusCode: 400,
      payload: {
        error: 'validation',
        detail: [
          {
            prop: 'appId',
            message: 'Field Required'
          },
          {
            prop: 'account',
            message: 'Field Required'
          },
          {
            prop: 'secret',
            message: 'Field Required'
          },          {
            prop: 'code',
            message: 'Field Required'
          }
        ]
      }
    },
    {
      statusCode: 400,
      payload: {
        error: 'authentication',
        detail: 'Provided Credentials No Good.'
      }
    },
    [ { uuid: '2fb1d82b-6665-45c6-b555-0e1749f9bdf5' } ],
    true,
    'sample error string',
    {
      'statusCode': 500,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    }
  ]
}





