export const fixtures: any = {}

const createRecord = `insert into "u2f"."u2f_key" ("account", "appid", "key_handle", "public_key", "uuid", "version") values ('accountId', 'appId', 'keyHandle', 'publicKey', 'universallyUniqueIdentification', 'version')`
fixtures.createRecord = createRecord

const readRecordsByU2fId = `select "uuid", "key_handle" as "keyHandle", "version", "nickname" from "u2f"."u2f_key" where "u2f_key"."u2fid" = 'byU2fId'`
fixtures.readRecordsByU2fId = readRecordsByU2fId

const readRecordsByU2fIdKeyhandle = `select "key_handle" as "keyHandle", "public_key", "version" from "u2f"."u2f_key" where "u2f_key"."u2fid" = 'byU2fId' and "u2f_key"."key_handle" = 'keyHandle'`
fixtures.readRecordsByU2fIdKeyhandle = readRecordsByU2fIdKeyhandle

const deleteRecordByU2fIdUuid = `delete from "u2f"."u2f_key" where "u2f_key"."u2fid" = 'uuid' and "u2f_key"."uuid" = 'byU2fId'`
fixtures.deleteRecordByU2fIdUuid = deleteRecordByU2fIdUuid

let record: any = {
  uuid: 'universallyUniqueIdentification',
  appid: 'appId',
  account: 'accountId',
  key_handle: 'keyHandle',
  public_key: 'publicKey',
  version: 'version'
}
fixtures.newU2fRecord = record

fixtures.keyRegisterStart = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'batman',
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
    {
      version: 'U2F_V2',
      appId: 'https://example.com',
      challenge: 'F4pbQ6e83iTOvG1Qcm896-DsafoMjKCEk2mzfHrPxQM'
    },
    true,
    {
      statusCode: 200,
      payload: {
        version: 'U2F_V2',
        appId: 'https://example.com',
        challenge: 'F4pbQ6e83iTOvG1Qcm896-DsafoMjKCEk2mzfHrPxQM'
      }
    },
    'sample error string',
    {
      'statusCode': 500,
      'payload': {
        'error': 'cache',
        'detail': 'sample error string'
      }
    },
    'zzzz'
  ]
}

fixtures.keyRegisterFinish = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'registrationResponse', positive: true },
      { prop: 'nickname' }
    ],
    {
      appId: 'https://example.com',
      account: 'batman',
      secret: 'secret',
      registrationResponse: {
        registrationData: 'BQS42oi6gKZskDDy44qwPgwQO2V6YbAPDU60DtpU_lkdpBoC0nvsMeaDdZlPxoQf8qE8GFIANR22Ql8Hm1LWE4iSQKUif9uZfAW4upV3QC-rxm-u8yTlAcDCow6FZVd-KT69MxkVFh8Sg4saowksfkBKhKsu3VE9YPpKQGhEw08461MwggE1MIHcoAMCAQICCwCuuiIHiowdAZfdMAoGCCqGSM49BAMCMBUxEzARBgNVBAMTClUyRiBJc3N1ZXIwGhcLMDAwMTAxMDAwMFoXCzAwMDEwMTAwMDBaMBUxEzARBgNVBAMTClUyRiBEZXZpY2UwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARrBFxgJFGdtQrVInUZ4kPz4UeZq1yoxD9xGirc2DLYh9QHlxQZ59hmwDzDST7nHvclsKeWpJ7qVtBXBVV5S4qtoxcwFTATBgsrBgEEAYLlHAIBAQQEAwIFIDAKBggqhkjOPQQDAgNIADBFAiEAwaOmji8WpyFGJwV_YrtyjJ4D56G6YtBGUk5FbSwvP3MCIAtfeOURqhgSn28jbZITIn2StOZ-31PoFt-wXZ3IuQ_eMEQCIADxLqSMxduD52KEN5QrKe2Y-EgdyjvCaSITZbfGftGOAiAszCBg5rfy5o8uw-oTYZoEvzHvw_8LOXrxapOfegLARA',
        version: 'U2F_V2',
        appId: 'https://example.com',
        challenge: 'F4pbQ6e83iTOvG1Qcm896-DsafoMjKCEk2mzfHrPxQM',
        clientData: 'eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZmluaXNoRW5yb2xsbWVudCIsImNoYWxsZW5nZSI6IkY0cGJRNmU4M2lUT3ZHMVFjbTg5Ni1Ec2Fmb01qS0NFazJtemZIclB4UU0iLCJvcmlnaW4iOiJodHRwczovL2V4YW1wbGUuY29tIiwiY2lkX3B1YmtleSI6InVudXNlZCJ9'
      },
      nickname: 'nickname'
    },
    [
      { prop: 'registrationResponse', positive: true },
      { prop: 'nickname' }
    ]

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
            prop: 'registrationResponse',
            message: 'Field Required'
          },
          {
            prop: 'nickname',
            message: 'Field Required'
          }
        ]
      }
    },
    '{\"version\":\"U2F_V2\",\"appId\":\"https://example.com\",\"challenge\":\"F4pbQ6e83iTOvG1Qcm896-DsafoMjKCEk2mzfHrPxQM\"}',
    {
      successful: true,
      publicKey: 'BLjaiLqApmyQMPLjirA-DBA7ZXphsA8NTrQO2lT-WR2kGgLSe-wx5oN1mU_GhB_yoTwYUgA1HbZCXwebUtYTiJI',
      keyHandle: 'pSJ_25l8Bbi6lXdAL6vGb67zJOUBwMKjDoVlV34pPr0zGRUWHxKDixqjCSx-QEqEqy7dUT1g-kpAaETDTzjrUw',
      certificate: {
        type: 'Buffer',
        data: [
          48,
          130,
          1,
          53,
          48,
          129,
          220,
          160,
          3,
          2,
          1,
          2,
          2,
          11,
          0,
          174,
          186,
          34,
          7,
          138,
          140,
          29,
          1,
          151,
          221,
          48,
          10,
          6,
          8,
          42,
          134,
          72,
          206,
          61,
          4,
          3,
          2,
          48,
          21,
          49,
          19,
          48,
          17,
          6,
          3,
          85,
          4,
          3,
          19,
          10,
          85,
          50,
          70,
          32,
          73,
          115,
          115,
          117,
          101,
          114,
          48,
          26,
          23,
          11,
          48,
          48,
          48,
          49,
          48,
          49,
          48,
          48,
          48,
          48,
          90,
          23,
          11,
          48,
          48,
          48,
          49,
          48,
          49,
          48,
          48,
          48,
          48,
          90,
          48,
          21,
          49,
          19,
          48,
          17,
          6,
          3,
          85,
          4,
          3,
          19,
          10,
          85,
          50,
          70,
          32,
          68,
          101,
          118,
          105,
          99,
          101,
          48,
          89,
          48,
          19,
          6,
          7,
          42,
          134,
          72,
          206,
          61,
          2,
          1,
          6,
          8,
          42,
          134,
          72,
          206,
          61,
          3,
          1,
          7,
          3,
          66,
          0,
          4,
          107,
          4,
          92,
          96,
          36,
          81,
          157,
          181,
          10,
          213,
          34,
          117,
          25,
          226,
          67,
          243,
          225,
          71,
          153,
          171,
          92,
          168,
          196,
          63,
          113,
          26,
          42,
          220,
          216,
          50,
          216,
          135,
          212,
          7,
          151,
          20,
          25,
          231,
          216,
          102,
          192,
          60,
          195,
          73,
          62,
          231,
          30,
          247,
          37,
          176,
          167,
          150,
          164,
          158,
          234,
          86,
          208,
          87,
          5,
          85,
          121,
          75,
          138,
          173,
          163,
          23,
          48,
          21,
          48,
          19,
          6,
          11,
          43,
          6,
          1,
          4,
          1,
          130,
          229,
          28,
          2,
          1,
          1,
          4,
          4,
          3,
          2,
          5,
          32,
          48,
          10,
          6,
          8,
          42,
          134,
          72,
          206,
          61,
          4,
          3,
          2,
          3,
          72,
          0,
          48,
          69,
          2,
          33,
          0,
          193,
          163,
          166,
          142,
          47,
          22,
          167,
          33,
          70,
          39,
          5,
          127,
          98,
          187,
          114,
          140,
          158,
          3,
          231,
          161,
          186,
          98,
          208,
          70,
          82,
          78,
          69,
          109,
          44,
          47,
          63,
          115,
          2,
          32,
          11,
          95,
          120,
          229,
          17,
          170,
          24,
          18,
          159,
          111,
          35,
          109,
          146,
          19,
          34,
          125,
          146,
          180,
          230,
          126,
          223,
          83,
          232,
          22,
          223,
          176,
          93,
          157,
          200,
          185,
          15,
          222
        ]
      }
    },
    {
      version: 'U2F_V2',
      appId: 'https://example.com',
      challenge: 'F4pbQ6e83iTOvG1Qcm896-DsafoMjKCEk2mzfHrPxQM'
    },
    {
      appId: 'https://example.com',
      challenge: 'F4pbQ6e83iTOvG1Qcm896-DsafoMjKCEk2mzfHrPxQM',
      version: 'U2F_V2'
    },
    'sample error string',
    {
      'statusCode': 500,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    },
    {
      'statusCode': 500,
      'payload': {
        'error': 'cache',
        'detail': 'sample error string'
      }
    },
    {
      'statusCode': 400,
      'payload': {
        'error': 'registration',
        'detail': false
      }
    },
    false,
    'zzzz'
  ]
}

fixtures.keyRemove = {
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
    },
    [
      { prop: 'uuid', positive: true }
    ]
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
      'statusCode': 500,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    },
    'zzzz'
  ]
}


fixtures.keyAuthenticateStart = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'batman',
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
    {
      version: 'U2F_V2',
      appId: 'https://example.com',
      challenge: '2ySFO1eVo3pfDkhQ3jlbTSzaq9ZVnxlaG-TDdY7gC3w'
    },
    true,
    [
      {
        uuid: '7616e1c9-a68a-40d6-ac48-80010896e56c',
        keyHandle: 'zg7DeZdpKC6mnr1a_udCaS-sybU_gzEBpqMPkZAxXv17q58AMsxSJ1QyhNCu9NRMxIhXskJUBRXDEH8b0AYf8g',
        version: 'U2F_V2'
      },
      {
        uuid: '335e2ae3-5b7f-4500-82fc-d5656ecb6ae0',
        keyHandle: 'Fufn9YXheJa2svapeB0tulgK9PhC59WIEO-pLni3fGIo5Oi3Jg2vzCEElNOyQVYbvdltWweQd2j_53uMgnD_bQ',
        version: 'U2F_V2'
      }
    ],
    'sample error string',
    {
      'statusCode': 500,
      'payload': {
        'error': 'datastore',
        'detail': 'sample error string'
      }
    },
    'zzzz'
  ]
}

fixtures.keyAuthenticateFinish = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true },
      { prop: 'registrationResponse', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'batman',
      secret: 'secret',
      registrationResponse: {
        keyHandle: 'GleE0udLgqLlmpYjB_4aWVKLofjpTw3XzfQyQPx8gKl6HYtYCfCSdsLiQXcvlndj5ZH8XJvmkT7qUrJx3e2DQg',
        clientData: 'eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZ2V0QXNzZXJ0aW9uIiwiY2hhbGxlbmdlIjoiTmM2dDNSMTFhN3h1OGc5NGU4SzJ6aWM2dm1ZUE5hajFrVlJOdllEWjQwMCIsIm9yaWdpbiI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJjaWRfcHVia2V5IjoidW51c2VkIn0',
        signatureData: 'AQAAANswRQIhAOi2sR4BGdLf1ZpaNCY8zDKRCOdq2PDUCDTWa928JaqUAiBqkfHDGmc0KlxVWPNZ_Z9L4-SylcYOxxx9lTj6alrkhA'
      }
    },
    [
      { prop: 'registrationResponse', positive: true }
    ]
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
            prop: 'registrationResponse',
            message: 'Field Required'
          }
        ]
      }
    },
    '{\"version\":\"U2F_V2\",\"appId\":\"https://example.com\",\"challenge\":\"Nc6t3R11a7xu8g94e8K2zic6vmYPNaj1kVRNvYDZ400\"}',
    {
      version: 'U2F_V2',
      appId: 'https://example.com',
      challenge: 'Nc6t3R11a7xu8g94e8K2zic6vmYPNaj1kVRNvYDZ400'
    },
    [
      {
        keyHandle: 'GleE0udLgqLlmpYjB_4aWVKLofjpTw3XzfQyQPx8gKl6HYtYCfCSdsLiQXcvlndj5ZH8XJvmkT7qUrJx3e2DQg',
        public_key: 'BIh588Y0c9eWQURIN1ejqn_w850f1CcWF0gPCJje3Hbn3NYeEExXIVF8nZ-kBzCAHacvfIt6H_F43NEf8DSNbXg',
        version: 'U2F_V2'
      }
    ],
    {
      successful: true,
      userPresent: true,
      counter: 219
    },
    '{\"version\":\"U2F_V2\",\"appId\":\"https://fail.com\",\"challenge\":\"Nc6t3R11a7xu8g94e8K2zic6vmYPNaj1kVRNvYDZ400\"}',
    {
      version: 'U2F_V2',
      appId: 'https://fail.com',
      challenge: 'Nc6t3R11a7xu8g94e8K2zic6vmYPNaj1kVRNvYDZ400'
    },
    {
      statusCode: 400,
      payload: {
        error: 'authentication',
        detail: 'Provided Credentials No Good.'
      }
    },
    'sample error string',
    {
      'statusCode': 500,
      'payload': {
        'error': 'datastore',
        'detail': 'sample error string'
      }
    },
    'zzzz'
  ]
}

fixtures.keyStatus = {
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
        uuid: '91e99f80-441a-4dae-afac-b2162bc38747',
        keyHandle: 'GleE0udLgqLlmpYjB_4aWVKLofjpTw3XzfQyQPx8gKl6HYtYCfCSdsLiQXcvlndj5ZH8XJvmkT7qUrJx3e2DQg',
        version: 'U2F_V2',
        nickname: 'U2F Key created @ 2018-8-1 17:50'
      },
      {
        uuid: 'ad8081a3-45fc-49d2-ba36-c7cadb370b45',
        keyHandle: 'iWskdDJV600hiLxxJrhRpht-gbIWl60-TE3GRuGLxD2oRgqVq3QseHLLTha8Wk3s9x2foL7f3xOp5xpgtGknmg',
        version: 'U2F_V2',
        nickname: 'U2F Key created @ 2018-8-5 17:50'
      }
    ],
    {
      statusCode: 200,
      payload: [
        {
          uuid: '91e99f80-441a-4dae-afac-b2162bc38747',
          keyHandle: 'GleE0udLgqLlmpYjB_4aWVKLofjpTw3XzfQyQPx8gKl6HYtYCfCSdsLiQXcvlndj5ZH8XJvmkT7qUrJx3e2DQg',
          version: 'U2F_V2',
          nickname: 'U2F Key created @ 2018-8-1 17:50'
        },
        {
          uuid: 'ad8081a3-45fc-49d2-ba36-c7cadb370b45',
          keyHandle: 'iWskdDJV600hiLxxJrhRpht-gbIWl60-TE3GRuGLxD2oRgqVq3QseHLLTha8Wk3s9x2foL7f3xOp5xpgtGknmg',
          version: 'U2F_V2',
          nickname: 'U2F Key created @ 2018-8-5 17:50'
        }
      ]
    },
    'zzzz'
  ]
}


