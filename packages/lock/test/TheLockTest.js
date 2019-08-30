/**
 * Test for TheLock.
 * Runs with mocha.
 */
'use strict'

const asleep = require('asleep')
const {
  strict: { equal, ok },
} = require('assert')
const TheLock = require('../lib/TheLock')

describe('the-lock', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheLock)
    const lock = TheLock()
    const lockKey = 'key01'
    const pool = {
      get: async () => {
        await asleep(Math.random() * 100)
        return pool.value
      },
      set: async (value) => {
        await asleep(Math.random() * 300)
        pool.value = value
      },
      value: 1,
    }
    await Promise.all([
      lock.acquire(lockKey, async () => {
        const value = await pool.get()
        await pool.set(value * 2)
      }),
      lock.acquire(lockKey, async () => {
        const value = await pool.get()
        await pool.set(value * 2)
      }),
    ])
    equal(pool.value, 4)
  })
})

/* global describe, before, after, it */
