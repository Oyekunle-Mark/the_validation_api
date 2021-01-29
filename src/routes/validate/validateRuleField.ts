import { NextFunction, Request, Response } from 'express'
import {
  createFieldMissingFromRuleMessage,
  createResponse,
  FieldNames,
  HttpStatusCode,
  object_t,
  ResponseMessage,
  ResponseStatus,
  string_t,
  ValidConditions,
} from '../../common'

export const validateRuleField = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
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
        createFieldMissingFromRuleMessage(FieldNames.field),
        ResponseStatus.error
      )
    }

    // rule.field cannot be an empty string
    if (typeof field === string_t && !field.length) {
      return createResponse(
        res,
        HttpStatusCode.StatusBadRequest,
        ResponseMessage.RuleFieldCannotBeEmpty,
        ResponseStatus.error
      )
    }

    // rule.condition must be provided
    if (condition === undefined) {
      return createResponse(
        res,
        HttpStatusCode.StatusBadRequest,
        createFieldMissingFromRuleMessage(FieldNames.condition),
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
        createFieldMissingFromRuleMessage(FieldNames.condition_value),
        ResponseStatus.error
      )
    }

    next()
  } catch (e) {
    console.log('Error in validate rule field: ', e.message)

    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseMessage.ErrorOccurred,
      ResponseStatus.error
    )
  }
}
