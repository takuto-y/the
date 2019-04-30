/**
 * Create a TheDB instance
 * @memberOf module:@the-/db
 * @function create
 * @param {...*} args
 * @returns {module:@the-/db.TheDB}
 */
'use strict'

const TheDB = require('./TheDB')

/** @lends module:@the-/db.create */
function create(...args) {
  return new TheDB(...args)
}

module.exports = create
