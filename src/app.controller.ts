import { api } from './app.responses'

export function mfaStatus(req, res) {
  const payload = {
    appId: req.query.appId || null,
    account: req.query.account || null,
    secret: req.query.secret || 'secret'
  }
  api.mfaStatus(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

export function mfaLogs(req, res) {
  const payload = {
    appId: req.query.appId || null,
    account: req.query.account || null,
    secret: req.query.secret || 'secret'
  }
  api.mfaLogs(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

export function swagger(req, res) {
  api.swagger()
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}