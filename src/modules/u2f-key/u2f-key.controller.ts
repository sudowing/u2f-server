import { Router } from 'restify-router'
import { api } from './u2f-key.responses'

const router = new Router()
router.post('/register', keyRegisterStart)
router.post('/register/finish', keyRegisterFinish)
router.del('/remove', keyRemove)
router.post('/authenticate', keyAuthenticateStart)
router.post('/authenticate/finish', keyAuthenticateFinish)
export const u2fRoutes = router

function keyRegisterStart(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret'
  }
  api.keyRegisterStart(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function keyRegisterFinish(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret',
    registrationResponse: req.body.registrationResponse || null,
    nickname: req.body.nickname || null
  }
  api.keyRegisterFinish(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function keyRemove(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret',
    uuid: req.body.uuid || null
  }
  api.keyRemove(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function keyAuthenticateStart(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret'
  }
  api.keyAuthenticateStart(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function keyAuthenticateFinish(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret',
    registrationResponse: req.body.deviceResponse || null
  }
  api.keyAuthenticateFinish(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}
