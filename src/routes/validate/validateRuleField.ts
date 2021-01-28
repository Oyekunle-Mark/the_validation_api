import { NextFunction, Request, Response } from 'express'
import {
  createMissingFromMessage,
  createResponse,
  FieldNames,
  HttpStatusCode,
  ResponseMessage,
  ResponseStatus,
  ValidConditions,
} from '../../common'

export const validateRuleField = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { rule } = req.body

  if (rule === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.RuleRequired,
      ResponseStatus.error
    )
  }

  if (typeof rule !== 'object' || rule.length !== undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.RuleShouldBeObject,
      ResponseStatus.error
    )
  }

  const { field, condition, condition_value } = rule

  if (field === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      createMissingFromMessage(FieldNames.field, FieldNames.rule),
      ResponseStatus.error
    )
  }

  if (condition === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      createMissingFromMessage(FieldNames.condition, FieldNames.rule),
      ResponseStatus.error
    )
  }

  if (!ValidConditions.has(condition)) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.InvalidConditionValue,
      ResponseStatus.error
    )
  }

  if (condition_value === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      createMissingFromMessage(FieldNames.condition_value, FieldNames.rule),
      ResponseStatus.error
    )
  }

  next()
}
