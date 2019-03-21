/**
 * @memberOf module:the-code/lib/processors
 * @function processJSDoc
 * @param {string} content
 * @param {Object} [options={}]
 */
'use strict'

const { parse } = require('the-ast')
const { commentModuleOnProgramNode } = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends processJSDoc */
async function processJSDoc(content, options = {}) {
  const { filename } = options
  return applyConverter(content, async (content) => {
    const parsed = parse(content, options)
    const JSDocComments = parsed.comments.filter(
      (CommentNode) => CommentNode.value[0] === '*',
    )

    const { get, replace } = contentAccess(content)

    {
      const converted = await commentModuleOnProgramNode(parsed.program, {
        JSDocComments,
        filename,
        get,
        replace,
      })
      if (converted) {
        return converted
      }
    }
    return content
  })
}

module.exports = processJSDoc
