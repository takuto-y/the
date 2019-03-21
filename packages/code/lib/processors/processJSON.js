'use strict'

const { sortProperties } = require('fmtjson')
const { EOL } = require('os')
const applyConverter = require('../helpers/applyConverter')

/** @lends processJSON */
function processJSON(content, options = {}) {
  return applyConverter(content, (content) => {
    const data = JSON.parse(content)
    const sorted = sortProperties(data)
    return JSON.stringify(sorted, null, 2) + EOL
  })
}

module.exports = processJSON
