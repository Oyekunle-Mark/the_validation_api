import { Router } from 'express'
import { baseController } from './base.controller'

const baseRoute = Router()

baseRoute.get('/', baseController)

export { baseRoute }
