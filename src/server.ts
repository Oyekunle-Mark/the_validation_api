import express, { Response } from 'express'
import { createResponse, HttpStatus, ResponseType } from './common'

const server = express()

server.use(express.json({ limit: '124kb' }))

server.get('/', (_, res: Response) =>
  createResponse(
    res,
    HttpStatus.StatusOk,
    ResponseType.Success,
    'Server is up!'
  )
)

export default server
