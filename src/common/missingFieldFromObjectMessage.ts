import { FieldNames } from './'

export const createMissingFromMessage = (
  field: FieldNames,
  from: FieldNames
): string => `field ${field} is missing from ${from}.`
