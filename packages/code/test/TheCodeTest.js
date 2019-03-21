/**
 * Test for TheCode.
 * Runs with mocha.
 */
'use strict'

const TheCode = require('../lib/TheCode')
const filecopy = require('filecopy')
const path = require('path')
const amkdirp = require('amkdirp')
const { writeFileAsync, mkdirpAsync, unlinkAsync } = require('asfs')
const { ok, equal } = require('assert')

describe('the-code', () => {
  before(async () => {
    await amkdirp(`${__dirname}/../tmp/`)
  })

  after(() => {
  })

  it('Should skip', () => {
    const code = new TheCode()
    equal(code.shouldSkipContent(`<!-- // Code generated by coz. DO NOT EDIT. --> \n hoge`), true)
    equal(code.shouldSkipContent(`// Code generated by coz. DO NOT EDIT.\n hoge`), true)
    equal(code.shouldSkipContent(`// generated by coz. DO NOT EDIT\n hoge`), false)
  })

  it('Src1', async () => {
    const target = `${__dirname}/../tmp/dest1.js`
    await filecopy(
      `${__dirname}/../misc/src01.js`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src2', async () => {
    const target = `${__dirname}/../tmp/dest2.js`
    await filecopy(
      `${__dirname}/../misc/src02.js`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src3', async () => {
    const target = `${__dirname}/../tmp/dest3.js`
    await filecopy(
      `${__dirname}/../misc/src03.js`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src5', async () => {
    const target = `${__dirname}/../tmp/dest5.js`
    await filecopy(
      `${__dirname}/../misc/src05.js`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src6', async () => {
    const target = `${__dirname}/../tmp/dest6.js`
    await filecopy(
      `${__dirname}/../misc/src06.js`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src7', async () => {
    const target = `${__dirname}/../tmp/dest7.pcss`
    await filecopy(
      `${__dirname}/../misc/src07.pcss`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src8', async () => {
    const target = `${__dirname}/../tmp/dest8.jsx`
    await filecopy(
      `${__dirname}/../misc/src08.jsx`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src9', async () => {
    const target = `${__dirname}/../tmp/dest9.jsx`
    await filecopy(
      `${__dirname}/../misc/src09.jsx`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src10', async () => {
    const target = `${__dirname}/../tmp/dest10.jsx`
    await filecopy(
      `${__dirname}/../misc/src10.jsx`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src11', async () => {
    const target = `${__dirname}/../tmp/dest11.js`
    await filecopy(
      `${__dirname}/../misc/src11.js`,
      target,
    )
    const code = new TheCode()

    await code.formatFile(target)
  })

  it('Src12', async () => {
    const target = `${__dirname}/../tmp/dest12.js`
    await filecopy(
      `${__dirname}/../misc/src12.js`,
      target,
    )
    const code = new TheCode()
    await code.formatFile(target)
  })

  it('Src13', async () => {
    const target = `${__dirname}/../tmp/dest13.jsx`
    await filecopy(
      `${__dirname}/../misc/src13.jsx`,
      target,
    )
    const code = new TheCode()
    await code.formatFile(target)
  })

  it('Src14', async () => {
    const target = `${__dirname}/../tmp/dest14.js`
    await filecopy(
      `${__dirname}/../misc/src14.js`,
      target,
    )
    const code = new TheCode()
    await code.formatFile(target)
  })

  it('Src15', async () => {
    const target = `${__dirname}/../tmp/dest15.js`
    await filecopy(
      `${__dirname}/../misc/src15.js`,
      target,
    )
    const code = new TheCode()
    await code.formatFile(target)
  })

  it('Src16', async () => {
    const target = `${__dirname}/../tmp/dest16.js`
    await filecopy(
      `${__dirname}/../misc/src16.js`,
      target,
    )
    const code = new TheCode()
    await code.formatFile(target)
  })

  it('Src17', async () => {
    const target = `${__dirname}/../tmp/dest17.js`
    await filecopy(
      `${__dirname}/../misc/src17.js`,
      target,
    )
    const code = new TheCode()
    await code.formatFile(target)
  })

  it('Using cache', async () => {
    const target = `${__dirname}/../tmp/testing-cache.js`

    await writeFileAsync(target, `
      const obj01 = {x:1,at: new Date(${new Date().getTime()})
      } 
    `)
    const code = new TheCode()
    ok(!(await code.formatFile(target)).skipped)
    ok((await code.formatFile(target)).skipped)
  })

  it('Skip write on ready only', async () => {
    const target = `${__dirname}/../tmp/testing-readonly.js`
    await mkdirpAsync(path.dirname(target))
    await unlinkAsync(target).catch(() => null)
    await writeFileAsync(target, `const obj01 = {x:1, a:2}   `, {
      mode: '444'
    })

    const code = new TheCode()
    await code.clearCache()
    ok((await code.formatFile(target)).skipped)
  })
})

/* global describe, before, after, it */
