import express, { Response } from 'express'
import { createResponse, HttpStatus, ResponseType } from './common'

const server = express()

server.use(express.json({ limit: '124kb' }))

server.get('/api', (_, res: Response) =>
  createResponse(
    res,
    HttpStatus.StatusOk,
    ResponseType.Success,
    'Server is up!'
  )
)

server.use((_, res: Response) =>
  createResponse(
    res,
    HttpStatus.StatusNotFound,
    ResponseType.Failure,
    'Not Found.'
  )
)

export default server
