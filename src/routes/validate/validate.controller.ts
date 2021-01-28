import { Request, Response } from 'express'
import {
  ConditionType,
  createResponse,
  HttpStatusCode,
  ResponseStatus,
} from '../../common'
import { IValidationResult } from './validate.type'

export const validateController = (req: Request, res: Response): Response => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { targetFieldValue } = req
  const {
    rule: { field, condition, condition_value },
  } = req.body

  let isValid: boolean

  switch (condition) {
    case ConditionType.eq:
      isValid = targetFieldValue == condition_value
      break
    case ConditionType.gt:
      isValid = targetFieldValue > condition_value
      break
    case ConditionType.gte:
      isValid = targetFieldValue >= condition_value
      break
    case ConditionType.neq:
      isValid = targetFieldValue != condition_value
      break
    case ConditionType.contains:
      isValid = targetFieldValue.includes(condition_value)
      break
    default:
      isValid = false
  }

  const message = isValid
    ? `field ${field} successfully validated.`
    : `field ${field} failed validation.`
  const httpStatus = isValid
    ? HttpStatusCode.StatusOk
    : HttpStatusCode.StatusBadRequest
  const responseStatus = isValid ? ResponseStatus.success : ResponseStatus.error
  const validation: IValidationResult = {
    error: !isValid,
    field,
    field_value: targetFieldValue,
    condition,
    condition_value,
  }

  return createResponse(res, httpStatus, message, responseStatus, {
    validation,
  })
}
