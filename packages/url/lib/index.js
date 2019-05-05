// Code generated by coz. DO NOT EDIT.
/**
 * @module @the-/url
 * @version 15.4.2
 * @description URL utility for the-framework
 * @typicalname url
 * @license MIT
 */
'use strict'

const addUrlQuery_ = require('./addUrlQuery')
const formatUrl_ = require('./formatUrl')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.addUrlQuery = addUrlQuery_
exports.formatUrl = formatUrl_

module.exports = {
  addUrlQuery: addUrlQuery_,
  formatUrl: formatUrl_,
}
