/**
 * @memberof module:the-code
 * @class TheCode
 */
'use strict'

const aglob = require('aglob')
const { canWriteAsync, readFileAsync, statAsync } = require('asfs')
const path = require('path')
const writeout = require('writeout')
const { typeHelper } = require('./helpers')
const FormatCache = require('./helpers/FormatCache')
const p = require('./processors')
const debug = require('debug')('the:code')

/** @lends TheCode */
class TheCode {
  constructor(config = {}) {
    const {
      cacheFile = `node_modules/.cache/the-code/cache.json`,
      cssProp = true,
      cssRule = true,
      fileEnd = true,
      jsClass = true,
      jsComment = true,
      jsDoc = true,
      jsFunction = true,
      jsImport = true,
      jsObject = true,
      json = true,
      jsPrettier = true,
      jsRequire = true,
      jsStrict = true,
      jsSwitch = true,
      jsUnused = true,
      jsxAttribute = true,
      yaml = true,
    } = config
    this.processers = {
      javascript: [
        jsFunction && p.processJSFunction,
        jsObject && p.processJSObject,
        jsRequire && p.processJSRequire,
        jsComment && p.processJSComment,
        jsClass && p.processJSClass,
        jsImport && p.processJSImport,
        jsStrict && p.processJSStrict,
        jsxAttribute && p.processJSXAttribute,
        jsSwitch && p.processJSSwitch,
        jsDoc && p.processJSDoc,
        jsUnused && p.processJSUnused,
        fileEnd && p.processFileEnd,
        jsPrettier && p.processJSPrettier,
      ].filter(Boolean),
      json: [json && p.processJSON, fileEnd && p.processFileEnd].filter(
        Boolean,
      ),
      stylesheet: [
        cssRule && p.processCSSRule,
        cssProp && p.processCSSProp,
        fileEnd && p.processFileEnd,
      ].filter(Boolean),
      text: [fileEnd && p.processFileEnd].filter(Boolean),
      yaml: [yaml && p.processYAML].filter(Boolean),
    }
    this.cache = new FormatCache(cacheFile)
  }

  shouldSkipContent(content) {
    // Using golang format
    // https://github.com/golang/go/issues/13560
    return /\/\/ Code generated by .* DO NOT EDIT/i.test(content)
  }

  async clearCache() {
    await this.cache.clear()
  }

  /**
   * Format files
   * @param {string} pattern  - file name
   * @param {Object} [options={}] - Optional
   * @returns {Promise<Array>}
   */
  async format(pattern, options = {}) {
    const { ignore } = options
    const filenames = await aglob(pattern, { ignore })
    const results = await Promise.all(
      filenames.map((filename) => this.formatFile(filename)),
    )
    return results.filter(Boolean)
  }

  /**
   * Format a single file
   * @param {string} filename
   * @returns {Promise<void>}
   */
  async formatFile(filename) {
    const shouldSkipFile = await this.shouldSkipFile(filename)
    if (shouldSkipFile) {
      debug('Skip', filename)
      return Promise.resolve({ filename, skipped: true })
    }
    const { cache } = this
    const input = String(await readFileAsync(filename))
    const shouldSkipContent = this.shouldSkipContent(input)
    if (shouldSkipContent) {
      debug('Skip', filename)
      return Promise.resolve({ filename, skipped: true })
    }
    const type = typeHelper.typeOf(filename)
    const sourceType = typeHelper.sourceTypeOf(filename)
    const processers = this.processers[type]
    const formatted = await processers.reduce(
      (input, process) =>
        Promise.resolve(input)
          .then((input) =>
            process.call(null, String(input), {
              filename: path.resolve(filename),
              sourceType,
            }),
          )
          .catch((err) => {
            err.message = `<${filename}> ${err.message}`
            throw err
          }),
      input,
    )
    const result = await writeout(filename, String(formatted), {
      skipIfIdentical: true,
    }).catch(() => null)
    if (result) {
      debug('File formatted', filename)
    }
    await cache.set(filename, { at: new Date().getTime() })
    return result
  }

  async shouldSkipFile(filename) {
    const stat = await statAsync(filename).catch(() => null)
    if (!stat) {
      return false
    }
    const canWrite = await canWriteAsync(filename)
    if (!canWrite) {
      return true
    }
    const cached = await this.cache.get(filename)
    if (!cached) {
      return false
    }
    return new Date(cached.at) >= new Date(stat.mtime)
  }
}

module.exports = TheCode
