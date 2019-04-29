/**
 * Assert module
 * @class TheAssert
 * @param {string} prefix - Prefix text
 * @param {Object} [options={}] - Optional settings
 * @param {Object} [options.evenProduction] - Skip asserting on production
 */
'use strict'

const invariant = require('invariant')

const isNullish = (v) => v === null || typeof v === 'undefined'

/** @lends TheAssert */
class TheAssert {
  constructor(prefix, options = {}) {
    const { evenProduction = true } = options
    this.prefix = prefix

    this.skip = !evenProduction && process.env.NODE_ENV === 'production'
  }

  /**
   * Bind methods
   * @returns {Object}
   */
  bind() {
    const ok = this.ok.bind(this)
    const nullish = this.nullish.bind(this)
    const notNullish = this.notNullish.bind(this)
    return Object.assign(ok, {
      notNullish,
      nullish,
      ok,
    })
  }

  /**
   * Assert that the value is NOT nullish (means either null nor undefined)
   * @param {*} value
   * @param {string} [message]
   */
  notNullish(value, message) {
    return this.ok(!isNullish(value), message)
  }

  /**
   * Assert that the value is nullish (null or undefined)
   * @param {*} value
   * @param {string} [message]
   */
  nullish(value, message) {
    return this.ok(isNullish(value), message)
  }

  /**
   * Assert that the condition is truethy
   * @param {*} condition
   * @param {String} [message]
   * @throws Error
   */
  ok(condition, message = 'assert failed') {
    if (this.skip) {
      return
    }
    invariant(condition, `[${this.prefix}]${message}`)
  }
}

module.exports = TheAssert
