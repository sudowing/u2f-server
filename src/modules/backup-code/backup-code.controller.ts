import { Router } from 'restify-router'
import { api } from './backup-code.responses'

const router = new Router()
router.post('/issue', codeRegister)
router.get('/authenticate', codeAuthenticate)
export const codeRoutes = router

function codeRegister(req, res) {
  const payload = {
    appId: req.body.appId || null,
    account: req.body.account || null,
    secret: req.body.secret || 'secret'
  }
  api.codeRegister(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}

function codeAuthenticate(req, res) {
  const payload = {
    appId: req.query.appId || null,
    account: req.query.account || null,
    secret: req.query.secret || 'secret',
    code: req.query.code || null
  }
  api.codeAuthenticate(payload)
    .then(apiResponse => {
      res.send(apiResponse.statusCode, apiResponse.payload)
    })
}
