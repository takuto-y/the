// Code generated by coz. DO NOT EDIT.
/**
 * @description Utility for file path
 * @license MIT
 * @module @the-/util-path
 * @typicalname utilPath
 * @version 15.4.8
 */
'use strict'

const findup_ = require('./findup')
const findupDir_ = require('./findupDir')
const helpers_ = require('./helpers')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.findup = findup_
exports.findupDir = findupDir_
exports.helpers = helpers_

module.exports = {
  findup: findup_,
  findupDir: findupDir_,
  helpers: helpers_,
}
