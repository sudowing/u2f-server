export const fixtures: any = {}

const readBackupCodesByU2fIdCode = `select count("uuid") from "u2f"."backup_code" where "backup_code"."u2fid" = 'byU2fId'`
fixtures.readBackupCodesByU2fIdCode = readBackupCodesByU2fIdCode

const readOtpDevicesByU2fIdCode = `select 'otp_device' as u2fType, "uuid", "nickname" from "u2f"."otp_device" where "otp_device"."u2fid" = 'byU2fId'`
fixtures.readOtpDevicesByU2fIdCode = readOtpDevicesByU2fIdCode

const readU2fKeysByU2fIdCode = `select 'u2f_key' as u2fType, "uuid", "key_handle", "version", "nickname" from "u2f"."u2f_key" where "u2f_key"."u2fid" = 'byU2fId'`
fixtures.readU2fKeysByU2fIdCode = readU2fKeysByU2fIdCode

const readLogsByU2fId = `select "uuid", "timestamp", "auth_type", "result" from "u2f"."auth_log" where "auth_log"."u2fid" = 'byU2fId'`
fixtures.readLogsByU2fId = readLogsByU2fId

let genServerResponseInput: any = {
  sport: 'baseball',
  city: 'Atlanta',
  state: 'Georgia',
  team: 'Braves'
}

fixtures.genServerResponse = {
  input: genServerResponseInput,
  output: {
    payload: {...genServerResponseInput},
    statusCode: 200
  }
}

fixtures.genError = {
  output: {
    detail: 'Provided Credentials No Good.',
    error: 'authentication'
  }
}

fixtures.genAuthError = {
  output: {
    detail: 'Provided Credentials No Good.',
    error: 'authentication'
  }
}

fixtures.validatePayload = {
  input: {
  },
  output: [
    {
      problems: [
        { message: 'Field Required', prop: 'this' }
      ],
      valid: false
    },
    {
      problems: [
        { message: 'Field must not be Null', prop: 'that' }
      ],
      valid: false
    },
    {
      problems: [
        { message: 'Square Root must be 144', prop: 'other' }
      ],
      valid: false
    },
    {
      problems: [],
      valid: true
    }
  ]
}


fixtures.mfaStatus = {
  input: [
    {
      appId: 'https://example.com',
      account: 'superman',
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
      { positive: true, prop: 'appId' },
      { positive: true, prop: 'account' },
      { positive: true, prop: 'secret' }
    ],
    {
      statusCode: 200,
      payload: {
        summary: {
          otp_device: true,
          u2f_key: true,
          backup_code: true
        },
        challenges: [
          {
            u2ftype: 'u2f_key',
            uuid: 'ef82aa1b-9356-4d62-b40a-ec31675ea567',
            key_handle: 'iAk6YBg-l-HXsT2Ffo_GazEJNKh7a_YpXNAvRUcKb054Br350HMmew7fpi9bs1Dd3TIki4B9R5SjkdSD7LuCcQ',
            version: 'U2F_V2',
            nickname: 'U2F Key created @ 2018-8-1 17:0'
          },
          {
            u2ftype: 'u2f_key',
            uuid: '341b4b8c-0aae-42da-972a-343511714c7c',
            key_handle: '-MmYXk7vDQIwciTN98E35Q_AkWfEfVL_t8P8Iqd_cazrXUUFGzdUFMXM51c9MCRulWlOieaobUfefUO9xaIngQ',
            version: 'U2F_V2',
            nickname: 'U2F Key created @ 2018-8-1 17:0'
          },
          {
            u2ftype: 'u2f_key',
            uuid: 'f917f587-d86a-408f-9cc0-9556188c8a11',
            key_handle: 'nm2PZXXBZ1s8Z4yk-j-55InGk37XDjdblRTBQv1Cz7Yd2hbZZhssKjys9S2FcDIE5yTGqNx_zKS2SBGaXB_T8A',
            version: 'U2F_V2',
            nickname: 'U2F Key created @ 2018-8-1 17:0'
          },
          {
            u2ftype: 'otp_device',
            uuid: '0881b88f-71f0-40d0-a921-de08f1515328',
            secret: 'IVETQM2YMEXUSZ3BJBEXS2L2JF4U4U2U',
            nickname: 'OTP Device created @ 2018-8-1 17:2'
          },
          {
            u2ftype: 'otp_device',
            uuid: '00a6af21-cc6d-4e43-ab17-4e2a3bd0d5ea',
            secret: 'NVVVAOKEJRTSWQZPPAYFIU3ULFDTSSDB',
            nickname: 'OTP Device created @ 2018-8-1 17:2'
          }
        ]
      }
    },
    {
      statusCode: 200,
      payload: {
        summary: {
          otp_device: false,
          u2f_key: false,
          backup_code: false
        },
        challenges: []
      }
    },
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

fixtures.u2fKeys = {
  output: [
    [
      {
        u2ftype: 'u2f_key',
        uuid: 'ef82aa1b-9356-4d62-b40a-ec31675ea567',
        key_handle: 'iAk6YBg-l-HXsT2Ffo_GazEJNKh7a_YpXNAvRUcKb054Br350HMmew7fpi9bs1Dd3TIki4B9R5SjkdSD7LuCcQ',
        version: 'U2F_V2',
        nickname: 'U2F Key created @ 2018-8-1 17:0'
      },
      {
        u2ftype: 'u2f_key',
        uuid: '341b4b8c-0aae-42da-972a-343511714c7c',
        key_handle: '-MmYXk7vDQIwciTN98E35Q_AkWfEfVL_t8P8Iqd_cazrXUUFGzdUFMXM51c9MCRulWlOieaobUfefUO9xaIngQ',
        version: 'U2F_V2',
        nickname: 'U2F Key created @ 2018-8-1 17:0'
      },
      {
        u2ftype: 'u2f_key',
        uuid: 'f917f587-d86a-408f-9cc0-9556188c8a11',
        key_handle: 'nm2PZXXBZ1s8Z4yk-j-55InGk37XDjdblRTBQv1Cz7Yd2hbZZhssKjys9S2FcDIE5yTGqNx_zKS2SBGaXB_T8A',
        version: 'U2F_V2',
        nickname: 'U2F Key created @ 2018-8-1 17:0'
      }
    ],
    []
  ]
}

fixtures.backupCodes = {
  output: [
    [{ count: '1' }],
    [{ count: '0' }]
  ]
}

fixtures.mfaLogs = {
  input: [
    [
      { prop: 'appId', positive: true },
      { prop: 'account', positive: true },
      { prop: 'secret', positive: true }
    ],
    {
      appId: 'https://example.com',
      account: 'superman',
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
        uuid: '86e916a1-fae9-4a42-8376-12c4b0854230',
        timestamp: '2018-09-19T12:58:23.963Z',
        u2fid: 'a5ab2a41dadcadbd3c5d409f2335bcd1c130c417e0f02d63eed2da891d8f07eb',
        auth_type: 'BACKUPCODE',
        result: true
      },
      {
        uuid: '28552750-5fcc-4036-88ab-12ceb3b0c1c7',
        timestamp: '2018-09-19T12:58:26.351Z',
        u2fid: 'a5ab2a41dadcadbd3c5d409f2335bcd1c130c417e0f02d63eed2da891d8f07eb',
        auth_type: 'BACKUPCODE',
        result: false
      }
    ],
    'sample error string',
    {
      'statusCode': 500,
      'payload': {
        'error': 'database',
        'detail': 'sample error string'
      }
    },
    'aaaaa'
  ]
}

fixtures.otpDevices = {
  output: [
    [
      {
        u2ftype: 'otp_device',
        uuid: '0881b88f-71f0-40d0-a921-de08f1515328',
        secret: 'IVETQM2YMEXUSZ3BJBEXS2L2JF4U4U2U',
        nickname: 'OTP Device created @ 2018-8-1 17:2'
      },
      {
        u2ftype: 'otp_device',
        uuid: '00a6af21-cc6d-4e43-ab17-4e2a3bd0d5ea',
        secret: 'NVVVAOKEJRTSWQZPPAYFIU3ULFDTSSDB',
        nickname: 'OTP Device created @ 2018-8-1 17:2'
      }
    ],
    []
  ]
}

fixtures.genU2fId = {
  output: [
    '1b0f02dc822fba22a8cb76c16fc73e16f72a267a1f869bd385d10c887018260c',
    'c0de0c9e8a82414565a356852db2d7ce31404888abfd3d3f40b48ac9a0e1d902'
  ]
}

fixtures.createLog = {
  input: [
    {
      uuid: 'b9bb6dd9-6455-4723-b4f7-3ebf64d44b08',
      u2fid: 'u2fid',
      auth_type: 'DEMO',
      result: true
    }
  ],
  output: [
    `insert into "u2f"."auth_log" ("auth_type", "result", "u2fid", "uuid") values ('DEMO', true, 'u2fid', 'b9bb6dd9-6455-4723-b4f7-3ebf64d44b08')`,
    'asdfsdaf'
  ]
}

fixtures.genNickname = {
  output: [
    'deviceType created @ '
  ]
}

fixtures.genAuthSuccess = {
  output: [
    {
      auth_type: 'UNKNOWN',
      result: true
    }
  ]
}
