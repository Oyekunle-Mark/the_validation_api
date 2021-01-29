import { FieldNames } from './'

export const createMissingFromMessage = (
  field: FieldNames | string,
  from: FieldNames
): string => `field ${field} is missing from ${from}.`

export const createNestingTooDeepMessage = (field: string): string =>
  `field ${field} is more than two levels deep.`
