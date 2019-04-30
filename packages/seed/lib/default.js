/**
 * Alias of {@link module:@the-/seed.create}
 * @function default
 */
'use strict'

const create = require('./create')
const TheSeed = require('./TheSeed')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheSeed,
})
