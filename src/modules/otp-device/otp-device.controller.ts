import { Router } from 'restify-router'
import { api } from './otp-device.responses'

const router = new Router()
router.post('/register', otpRegisterStart)
router.post('/register/finish', otpRegisterFinish)
router.del('/remove', otpRemove)
router.get('/authenticate', otpAuthenticate)
export const otpRoutes = router

function otpRegisterStart(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret',
    type: req.body.type || null
  }
  api.otpRegisterStart(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function otpRegisterFinish(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret',
    token: req.body.token || null,
    type: req.body.type || null,
    nickname: req.body.nickname || null
  }
  api.otpRegisterFinish(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function otpRemove(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret',
    uuid: req.body.uuid || null
  }
  api.otpRemove(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function otpAuthenticate(req, res) {
  const payload = {
    appId: req.query.appId || null,
    account: req.query.account || null,
    secret: req.query.secret || 'secret',
    token: req.query.token || null
  }
  api.otpAuthenticate(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}
