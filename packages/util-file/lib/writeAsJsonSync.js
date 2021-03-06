'use strict'

const { sortProperties } = require('fmtjson')
const { writeFileSync } = require('fs')
const JSON5 = require('json5')
const mkdirp = require('mkdirp')
const { EOL } = require('os')
const path = require('path')
const isJSON5File = require('./isJSON5File')

/**
 * @memberof module:@the-/util-file
 * @function writeAsJsonSync
 * @param {string} filename
 * @param {Object} data
 * @param {Object} [options]
 * @param {boolean} [options.sort=true]
 */
function writeAsJsonSync(filename, data, options = {}) {
  mkdirp.sync(path.dirname(filename))
  const { sort = true } = options
  if (sort) {
    data = sortProperties(data)
  }

  const isJSON5 = isJSON5File(filename)
  const content = isJSON5
    ? JSON5.stringify(data, null, 2) + EOL
    : JSON.stringify(data, null, 2) + EOL
  writeFileSync(filename, content)
}

module.exports = writeAsJsonSync
