/**
 * Test for decorateRule.
 * Runs with mocha.
 */
'use strict'

const decorateRule = require('../lib/rules/decorateRule')
const fs = require('fs')
const { ok, equal } = require('assert')

describe('decorate-rule', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const reported = []
    await decorateRule({
      declared: true,
    })({
      content: fs.readFileSync(
        require.resolve('../misc/mocks/mock-file.05.jsx')
      ),
      filename: 'hoge.jsx',
      report: (...args) => reported.push(args)
    })
    // equal(reported.length, 1)
  })
})

/* global describe, before, after, it */
