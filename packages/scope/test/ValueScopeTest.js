/**
 * Test for ValueScope.
 * Runs with mocha.
 */
'use strict'

const { TheStore } = require('@the-/store')
const ValueScope = require('../lib/scopes/ValueScope')
const { ok, strictEqual } = require('assert')

describe('value-scope', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const store = new TheStore({})

    const a = {}

    const v = store.load(ValueScope, 'v')

    v.set(a)

    strictEqual(v.state, a)

    v.del()

    ok(!v.state)
  })
})

/* global describe, before, after, it */
