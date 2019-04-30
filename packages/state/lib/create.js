/**
 * Create a TheState instance
 * @memberOf module:@the-/state
 * @function create
 * @param {...*} args
 * @returns {TheState}
 */
'use strict'

const TheState = require('./TheState')

/** @lends create */
function create(...args) {
  return new TheState(...args)
}

module.exports = create
