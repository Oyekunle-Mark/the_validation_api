import { FieldNames } from './'

export const createFieldMissingFromDataMessage = (field: string): string =>
  `field ${field} is missing from ${FieldNames.data}.`

export const createFieldMissingFromRuleMessage = (field: FieldNames): string =>
  `field ${field} is required.`

export const createNestingTooDeepMessage = (field: string): string =>
  `field ${field} is more than two levels deep.`

export const createFieldShouldBeAStringMessage = (field: string): string =>
  `${field} should be a string.`
