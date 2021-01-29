import { Request, Response } from 'express'
import {
  ConditionType,
  createResponse,
  HttpStatusCode,
  ResponseMessage,
  ResponseStatus,
} from '../../common'
import { IValidationResult } from './validate.type'

export const validateController = (req: Request, res: Response): Response => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { targetFieldValue } = req
    const {
      rule: { field, condition, condition_value },
    } = req.body

    let isValid: boolean

    // evaluate field condition condition_value
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
        // perform error checking for numeric types
        try {
          isValid = targetFieldValue.includes(condition_value)
        } catch (e) {
          isValid = false
        }

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

    const responseStatus = isValid
      ? ResponseStatus.success
      : ResponseStatus.error

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
  } catch (e) {
    console.log('Error in validate controller: ', e.message)

    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseMessage.ErrorOccurred,
      ResponseStatus.error
    )
  }
}
