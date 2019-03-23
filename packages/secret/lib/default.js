/**
 * Default exports
 * @function theSecret
 * @returns {TheSecret}
 */
'use strict'

const create = require('./create')
const TheSecret = require('./TheSecret')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheSecret = TheSecret
exports.create = create

/** @lends theSecret */
module.exports = Object.assign(lib, {
  TheSecret,
  create,
})