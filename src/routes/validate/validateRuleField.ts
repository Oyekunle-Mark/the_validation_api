import { NextFunction, Request, Response } from 'express'
import {
  createMissingFromMessage,
  createResponse,
  FieldNames,
  HttpStatusCode,
  ResponseMessage,
  ResponseStatus,
  ValidConditions,
  object_t,
} from '../../common'

export const validateRuleField = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { rule } = req.body

  // rule field must be present
  if (rule === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.RuleRequired,
      ResponseStatus.error
    )
  }

  // rule field cannot be an array or a number
  if (typeof rule !== object_t || rule.length !== undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.RuleShouldBeObject,
      ResponseStatus.error
    )
  }

  const { field, condition, condition_value } = rule

  // rule.field must be provided
  if (field === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      createMissingFromMessage(FieldNames.field, FieldNames.rule),
      ResponseStatus.error
    )
  }

  // rule.condition must be provided
  if (condition === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      createMissingFromMessage(FieldNames.condition, FieldNames.rule),
      ResponseStatus.error
    )
  }

  // rule.condition must be valid
  if (!ValidConditions.has(condition)) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.InvalidConditionValue,
      ResponseStatus.error
    )
  }

  // rule.condition_value must be provided
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
