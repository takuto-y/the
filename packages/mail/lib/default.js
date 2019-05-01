/**
 * Alias of {@function default
 * @link module:@the-/mail.create}
 */
'use strict'

const create = require('./create')
const helpers = require('./helpers')
const TheMail = require('./TheMail')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheMail,
  helpers,
})