'use strict'

const {
  DataTypes: { ENTITY, REF },
} = require('@the-/resource')

const TypeGroups = {
  [ENTITY]: [ENTITY, REF],
  [REF]: [ENTITY, REF],
}

/**
 * Parse db policy
 * @memberof execSqlite
 * @function parsePolicy
 * @param policy
 * @returns {*}
 */
function parsePolicy(policy) {
  const parsed = {}
  for (const [name, values] of Object.entries(policy)) {
    const { type } = values || {}
    const typeGroups = TypeGroups[type]
    parsed[name] = {
      default: () => null,
      ...(values || {}),
      type: typeGroups || type,
    }
  }
  return parsed
}

module.exports = parsePolicy
