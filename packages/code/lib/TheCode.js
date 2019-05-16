/**
 * @memberof module:@the-/code
 * @class TheCode
 * @param {Object} [config={}] - Code config
 */
'use strict'

const aglob = require('aglob')
const { canWriteAsync, readFileAsync, statAsync } = require('asfs')
const path = require('path')
const writeout = require('writeout')
const Types = require('./constants/Types')
const { typeHelper } = require('./helpers')
const FormatCache = require('./helpers/FormatCache')
const p = require('./processors')
const pkg = require('../package')
const debug = require('debug')('the:code')

/** @lends module:@the-/code.TheCode */
class TheCode {
  constructor(config = {}) {
    const {
      cacheFile = `node_modules/.cache/the-code/cache.json`,
      cssProp = true,
      cssRule = true,
      fileEnd = true,
      jsBlock = true,
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
      jsString = true,
      jsSwitch = true,
      jsUnused = true,
      jsxAttribute = true,
      yaml = true,
    } = config
    this.processers = {
      [Types.JAVA_SCRIPT]: [
        jsBlock && p.processJSBlock,
        jsComment && p.processJSComment,
        jsClass && p.processJSClass,
        jsDoc && p.processJSDoc,
        fileEnd && p.processFileEnd,
        jsFunction && p.processJSFunction,
        jsImport && p.processJSImport,
        jsObject && p.processJSObject,
        jsRequire && p.processJSRequire,
        jsStrict && p.processJSStrict,
        jsSwitch && p.processJSSwitch,
        jsString && p.processJSString,
        jsxAttribute && p.processJSXAttribute,
        jsUnused && p.processJSUnused,
        jsPrettier && p.processJSPrettier,
      ].filter(Boolean),
      [Types.JSON]: [json && p.processJSON, fileEnd && p.processFileEnd].filter(
        Boolean,
      ),
      [Types.JSON_PACKAGE_JSON]: [p.processPackageJSON].filter(Boolean),
      [Types.STYLE_SHEET]: [
        cssRule && p.processCSSRule,
        cssProp && p.processCSSProp,
        fileEnd && p.processFileEnd,
      ].filter(Boolean),
      [Types.TEXT]: [fileEnd && p.processFileEnd].filter(Boolean),
      [Types.YAML]: [yaml && p.processYAML].filter(Boolean),
    }
    this.cache = new FormatCache(cacheFile, {
      version: pkg.version,
    })
  }

  shouldSkipContent(content) {
    return [
      // Using golang format
      // https://github.com/golang/go/issues/13560
      /\/\/ Code generated by .* DO NOT EDIT/i,
      /<!-- Code generated by .* DO NOT EDIT -->/i,
      /# Code generated by .* DO NOT EDIT/i,
      // TODO support the-code-enable like  https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments
      /\* the-code-disable \*/i,
    ].some((pattern) => pattern.test(content))
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
   * @returns {Promise<undefined>}
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
            process(String(input), {
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
