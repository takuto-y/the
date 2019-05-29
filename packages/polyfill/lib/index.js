// Code generated by coz. DO NOT EDIT.
/**
 * @description Polyfill of the-frameworks
 * @license MIT
 * @module @the-/polyfill
 * @typicalname polyfill
 * @version 15.4.7
 */
'use strict'

const ThePolyfill_ = require('./ThePolyfill')
const create_ = require('./create')
const helpers_ = require('./helpers')
const default__ = require('./default')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.ThePolyfill = ThePolyfill_
exports.create = create_
exports.helpers = helpers_

module.exports = default__
