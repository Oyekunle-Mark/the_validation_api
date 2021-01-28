export interface IValidationResult {
  error: boolean
  field: string
  field_value: string | number
  condition: string
  condition_value: string | number
}
