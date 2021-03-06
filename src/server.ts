import express from 'express'
import { baseRoute, validateRuleRoute } from './routes'
import {
  createResponse,
  HttpStatusCode,
  ResponseMessage,
  ResponseStatus,
} from './common'

const server = express()

server.use((req, res, next) => {
  express.json({ limit: '124kb' })(req, res, (err) => {
    if (err) {
      return createResponse(
        res,
        HttpStatusCode.StatusBadRequest,
        ResponseMessage.InvalidJsonPayload,
        ResponseStatus.error
      )
    }

    next()
  })
})

server.use('/', baseRoute)
server.use('/validate-rule', validateRuleRoute)

export default server
