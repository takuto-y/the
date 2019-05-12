/**
 * Configuration for prettier
 * @memberof module:@the-/const-code
 * @namespace PrettierConfig
 */
'use strict'

module.exports = Object.freeze(
  /** @lends module:@the-/const-code.PrettierConfig */
  {
    arrowParens: 'avoid',
    jsxBracketSameLine: false,
    jsxSingleQuote: true,
    parser: 'babel',
    quoteProps: 'as-needed',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  },
)
