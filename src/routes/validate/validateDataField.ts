import { NextFunction, Request, Response } from 'express'
import {
  createMissingFromMessage,
  createResponse,
  FieldNames,
  HttpStatusCode,
  ResponseMessage,
  ResponseStatus,
  string_t,
  number_t,
  createNestingTooDeepMessage,
  createFieldShouldBeAStringMessage,
} from '../../common'

export const validateDataField = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const {
      data,
      rule: { field },
    } = req.body

    // data field must be provided
    if (data === undefined) {
      return createResponse(
        res,
        HttpStatusCode.StatusBadRequest,
        ResponseMessage.DataRequired,
        ResponseStatus.error
      )
    }

    // data cannot be a number
    if (typeof data === number_t) {
      return createResponse(
        res,
        HttpStatusCode.StatusBadRequest,
        ResponseMessage.DataCannotBeNumber,
        ResponseStatus.error
      )
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    let resultantTargetFieldValue: object

    // if data is an array or a string
    if (data.length !== undefined || typeof data === string_t) {
      if (field >= data.length) {
        return createResponse(
          res,
          HttpStatusCode.StatusBadRequest,
          createMissingFromMessage(field, FieldNames.data),
          ResponseStatus.error
        )
      }

      resultantTargetFieldValue = data[field]
    } else { // otherwise, data is an object
      // ensure field is not a number before split
      if (typeof field === number_t) {
        return createResponse(
          res,
          HttpStatusCode.StatusBadRequest,
          createFieldShouldBeAStringMessage('rule.field'),
          ResponseStatus.error
        )
      }

      const levels = field.split('.')

      // do not support nesting greater that two levels
      if (levels.length > 2) {
        return createResponse(
          res,
          HttpStatusCode.StatusBadRequest,
          createNestingTooDeepMessage(field),
          ResponseStatus.error
        )
      }

      // if target field is two levels deep
      if (levels.length === 2) {
        const [level1, level2] = levels
        const nestedObject = data[level1] // extract first level

        if (nestedObject === undefined) {
          return createResponse(
            res,
            HttpStatusCode.StatusBadRequest,
            createMissingFromMessage(field, FieldNames.data),
            ResponseStatus.error
          )
        }

        const dataFieldValue = nestedObject[level2] // extract second level

        if (dataFieldValue === undefined) {
          return createResponse(
            res,
            HttpStatusCode.StatusBadRequest,
            createMissingFromMessage(field, FieldNames.data),
            ResponseStatus.error
          )
        }

        resultantTargetFieldValue = dataFieldValue
      } else { // one level object
        const [targetField] = levels
        const dataFieldValue = data[targetField] // extract field value

        if (dataFieldValue === undefined) {
          return createResponse(
            res,
            HttpStatusCode.StatusBadRequest,
            createMissingFromMessage(field, FieldNames.data),
            ResponseStatus.error
          )
        }

        resultantTargetFieldValue = dataFieldValue
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.targetFieldValue = resultantTargetFieldValue // add the target field to request body. to be used in the controller

    next()
  } catch (e) {
    console.log('Error in validate data field: ', e.message)

    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseMessage.ErrorOccurred,
      ResponseStatus.error
    )
  }
}
