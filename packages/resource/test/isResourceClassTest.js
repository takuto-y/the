/**
 * Test for isResourceClass.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const isResourceClass = require('../lib/isResourceClass')
const TheResource = require('../lib/TheResource')

describe('is-resource-class', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(isResourceClass(TheResource))
    ok(isResourceClass(class extends TheResource {}))
    ok(
      isResourceClass(
        class C1 extends class C2 extends class TheResource {} {} {},
      ),
    )

    ok(
      !isResourceClass(
        class C1 extends class C2 extends class NotTheResource {} {} {},
      ),
    )
  })
})

/* global describe, before, after, it */