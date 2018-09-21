export const fixtures: any = {}

const createRecord = `insert into "u2f"."otp_device" ("account", "appid", "secret", "uuid") values ('accountId', 'appId', 'thisIsaSecret', 'universallyUniqueIdentification')`
fixtures.createRecord = createRecord

const readRecordsByU2fId = `select "uuid", "secret", "nickname" from "u2f"."otp_device" where "otp_device"."u2fid" = 'byU2fId'`
fixtures.readRecordsByU2fId = readRecordsByU2fId

const deleteRecordByU2fIdUuid = `delete from "u2f"."otp_device" where "otp_device"."u2fid" = 'uuid' and "otp_device"."uuid" = 'byU2fId'`
fixtures.deleteRecordByU2fIdUuid = deleteRecordByU2fIdUuid

const record = {
  uuid: 'universallyUniqueIdentification',
  appid: 'appId',
  account: 'accountId',
  secret: 'thisIsaSecret'
}
fixtures.newOtpRecord = record


fixtures.otpRegisterStart = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'type' }
    ],
    {
      appId: 'https://example.com',
      account: 'robot',
      secret: 'secret',
      type: null
    },
    null
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
          },
          {
            prop: 'type',
            message: 'Field Required'
          }
        ]
      }
    },
    {
      statusCode: 200,
      payload: {
        imageUrl: 'data:image/png;base64,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',
        secret: 'GBMTMMZRNJYHC3KQOJXEE53MKNDEIRLZ'
      }
    },
    'IYYWYOCXNVUG66DUNNUXQL2NIVXU66SJ',
    true,
    'otpauth://totp/https://example.com:robot?secret=IYYWYOCXNVUG66DUNNUXQL2NIVXU66SJ&issuer=https://example.com',
    {
      imageUrl: 'data:image/png;base64,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',
      secret: 'IYYWYOCXNVUG66DUNNUXQL2NIVXU66SJ'
    },
    'sample error string',
    {
      'statusCode': 400,
      'payload': {
        'error': 'cache',
        'detail': 'sample error string'
      }
    },
    {
      'statusCode': 400,
      'payload': {
        'error': 'qrcode',
        'detail': 'sample error string'
      }
    }
  ]
}

fixtures.otpRegisterFinish = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'token', positive: true },
      { prop: 'type' },
      { prop: 'nickname' }
    ],
    {
      appId: 'https://example.com',
      account: 'robot',
      secret: 'secret',
      token: '123456',
      type: null,
      nickname: 'nickname'
    },
    'sdsdfds'
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
          },
          {
            prop: 'token',
            message: 'Field Required'
          },
          {
            prop: 'type',
            message: 'Field Required'
          },
          {
            prop: 'nickname',
            message: 'Field Required'
          }
        ]
      }
    },
    'IYYWYOCXNVUG66DUNNUXQL2NIVXU66SJ',
    true,
    true,
    {
      statusCode: 200,
      payload: {
        message: 'OTP Device Registered!'
      }
    },
    'sample error string',
    {
      'statusCode': 400,
      'payload': {
        'error': 'cache',
        'detail': 'sample error string'
      }
    },
    {
      'statusCode': 400,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    },
    {
      'statusCode': 400,
      'payload': {
        'error': 'registration',
        'detail': 'registration failed: token failed otp check'
      }
    },
    false,
    'zzzzy'
  ]
}


fixtures.otpRemove = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'uuid', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'batman',
      secret: 'secret',
      uuid: '06a8c09a-0657-40d5-9891-adf0c488864b'
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
          },
          {
            prop: 'uuid',
            message: 'Field Required'
          }
        ]
      }
    },
    1,
    {
      statusCode: 200,
      payload: {
        data: 'Record removed.'
      }
    },
    0,
    {
      statusCode: 400,
      payload: {
        error: 'record',
        detail: 'Record does not exist.'
      }
    },
    2,
    'sample error string',
    {
      'statusCode': 400,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    },
    {
      'statusCode': 400,
      'payload': {
        'error': 'registration',
        'detail': 'registration failed: token failed otp check'
      }
    },
    false,
    'zzzz'
  ]
}



fixtures.otpAuthenticate = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'token', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'robot',
      secret: 'secret',
      token: '123456'
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
          },
          {
            prop: 'token',
            message: 'Field Required'
          }
        ]
      }
    },
    [
      {
        uuid: '7fd89317-8e94-424c-919c-2d64d5df32b2',
        secret: 'ORDUCV2VJVWFCNLFLE2XU4DDNIZU2VZQ'
      }
    ],
    true,
    false,
    {
      statusCode: 400,
      payload: {
        error: 'authentication',
        detail: 'Provided Credentials No Good.'
      }
    },
    'sample error string',
    {
      'statusCode': 400,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    },
    'zzzzx'
  ]
}

fixtures.otpStatus = {
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
    [
      {
        uuid: '97d93bad-ada7-46af-841b-2825ea8154db',
        secret: 'IZJGWMBRJBGVCNKTKZIC6QLOK5ZTOVJR',
        nickname: 'OTP Device created @ 2018-8-1 19:33'
      },
      {
        uuid: '602e17d7-a816-4442-a8a9-9c35163f774d',
        secret: 'PFGUG4DWIZJTOZSEFN4GS6BWPBYE6RTQ',
        nickname: 'OTP Device created @ 2018-8-1 19:34'
      },
      {
        uuid: '66aaffb1-d56f-4093-b392-2b00ea7275b3',
        secret: 'MVLFU2DWLFJHGZRTJZVXK22RIZWSWTJR',
        nickname: 'OTP Device created @ 2018-8-1 19:34'
      }
    ],
    {
      statusCode: 200,
      payload: [
        {
          uuid: '97d93bad-ada7-46af-841b-2825ea8154db',
          secret: 'IZJGWMBRJBGVCNKTKZIC6QLOK5ZTOVJR',
          nickname: 'OTP Device created @ 2018-8-1 19:33'
        },
        {
          uuid: '602e17d7-a816-4442-a8a9-9c35163f774d',
          secret: 'PFGUG4DWIZJTOZSEFN4GS6BWPBYE6RTQ',
          nickname: 'OTP Device created @ 2018-8-1 19:34'
        },
        {
          uuid: '66aaffb1-d56f-4093-b392-2b00ea7275b3',
          secret: 'MVLFU2DWLFJHGZRTJZVXK22RIZWSWTJR',
          nickname: 'OTP Device created @ 2018-8-1 19:34'
        }
      ]
    },
    'sample error string',
    {
      'statusCode': 400,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    },
    'zzzz'
  ]
}
