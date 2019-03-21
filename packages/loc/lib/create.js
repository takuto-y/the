/**
 * Create a TheLoc instance
 * @memberOf module:@the-/loc
 * @function create
 * @param {...*} args
 * @returns {TheLoc}
 */
'use strict'

const TheLoc = require('./TheLoc')

/** @lends create */
function create(...args) {
  return new TheLoc(...args)
}

module.exports = create
