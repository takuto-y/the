'use strict'

/**
 * Data types
 * @memberof module:@the-/resource
 * @namespace DataTypes
 */
const { DataTypes } = require('clay-constants')
const { isProduction } = require('@the-/check-env')
const { TheHash } = require('@the-/hash')

module.exports = DataTypes

if (!isProduction()) {
  module.exports = new TheHash(module.exports).toProxy({
    name: 'DataTypes',
    unknownCheck: true,
  })
}
