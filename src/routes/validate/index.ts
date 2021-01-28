import { Router } from 'express'
import { validateRuleField } from './validateRuleField'
import { validateDataField } from './validateDataField'
import { validateController } from './validate.controller'

const validateRuleRoute = Router()

validateRuleRoute.post(
  '/',
  validateRuleField,
  validateDataField,
  validateController
)

export { validateRuleRoute }
