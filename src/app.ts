import * as corsMiddleware from 'restify-cors-middleware'
import * as restify from 'restify'
import * as apiController from './app.controller'

import { codeRoutes } from './modules/backup-code'
import { otpRoutes } from './modules/otp-device'
import { u2fRoutes } from './modules/u2f-key'

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({
  mapParams: true,
  maxFileSize: 204800 // 200kbs
}))

// load top level routes

server.get('/swagger', apiController.swagger)
server.get('/status', apiController.mfaStatus)
server.get('/logs', apiController.mfaLogs)
// load nested routes from modules
u2fRoutes.applyRoutes(server, '/key')
otpRoutes.applyRoutes(server, '/otp')
codeRoutes.applyRoutes(server, '/code')

server.listen(8443, function() {} )
