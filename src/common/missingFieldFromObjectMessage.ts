import { FieldNames } from './'

export const createMissingFromMessage = (
  field: FieldNames | string,
  from: FieldNames
): string => `field ${field} is missing from ${from}.`
