/**
 * Test for callRule.
 * Runs with mocha.
 */
'use strict'

const callRule = require('../lib/rules/callRule')
const fs = require('fs')
const { ok, equal } = require('assert')

describe('call-rule', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const reported = []
    await callRule({
      keypathArguments: {
        l: require.resolve('../misc/mocks/mock-loc.json')
      }
    })({
      content: fs.readFileSync(
        require.resolve('../misc/mocks/mock-file.02.jsx')
      ),
      filename: 'hoge.js',
      report: (...args) => reported.push(args)
    })
    ok(reported[0][0], 'Keypath not found')
    // equal(reported.length, 2)
  })
})

/* global describe, before, after, it */
