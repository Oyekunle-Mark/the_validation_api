import express from 'express'
import { baseRoute } from './routes'

const server = express()

server.use(express.json({ limit: '124kb' }))

server.use('/', baseRoute)

export default server
