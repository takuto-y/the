/**
 * Test for processJSXAttribute.
 * Runs with mocha.
 */
'use strict'

const processJSXAttribute = require('../lib/processors/processJSXAttribute')
const { ok, equal } = require('assert').strict

describe('process-j-s-x-attribute', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    equal(
      await processJSXAttribute(`
        const a = <div id='hoge' {...{a:b}} href='javascript:void(0)' className='d'></div>
      `, {
        sourceType: 'module'
      }), `
        const a = <div id='hoge' {...{a:b}} className='d' href='javascript:void(0)'></div>
      `
    )
  })

})

/* global describe, before, after, it */
