export const ValidConditions = new Set<string>([
  'eq',
  'neq',
  'gt',
  'gte',
  'contains',
])

export enum ConditionType {
  eq = 'eq',
  neq = 'neq',
  gt = 'gt',
  gte = 'gte',
  contains = 'contains',
}
