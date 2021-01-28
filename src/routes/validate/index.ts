import { Router } from 'express'
import { validateController } from './validate.controller'

const validateRuleRoute = Router()

validateRuleRoute.post('/', validateController)

export { validateRuleRoute }
