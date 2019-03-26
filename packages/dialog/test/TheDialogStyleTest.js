/**
 * Test for TheDialogStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheDialogStyle from '../lib/TheDialogStyle'

describe('the-dialog-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheDialogStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
