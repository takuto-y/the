'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const util = require('util')
const isBase64 = require('./isBase64')

const writeFileAsync = util.promisify(fs.writeFile)

const TYPE_EXTRACT_PATTERN = /^data:.*\/([\w+]+);base64,([\s\S]+)/

const Extensions = {
  'svg+xml': 'svg',
  jpeg: 'jpg',
  quicktime: 'mov',
}

/**
 * Save base64 string into file
 * @function saveBase64
 * @param {string} dirname - Directory name
 * @param {string} basename - Basename of saving file
 * @param {string} data
 * @returns {Promise}
 */
async function saveBase64(dirname, basename, data) {
  if (!isBase64(data)) {
    throw new Error('[saveBase64] data must be base64')
  }

  await mkdirp(dirname)
  const matched = data.match(TYPE_EXTRACT_PATTERN)
  if (!matched) {
    return null
  }

  const [, type, payload] = matched
  const filename = path.join(
    dirname,
    [basename, Extensions[type] || type].join('.'),
  )
  await mkdirp(path.dirname(filename))
  await writeFileAsync(filename, payload, 'base64')
  return {
    filename,
  }
}

module.exports = saveBase64
