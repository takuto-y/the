/**
 * Create "packageRule" lint
 * @memberof module:@the-/lint.rules
 * @function packageRule
 * @param {Object} config - Lint config
 * @returns {function()} Lint function
 */
'use strict'

const aglob = require('aglob')
const { readFileAsync } = require('asfs')
const path = require('path')
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const { parsePattern } = require('../helpers/parseHelper')

/** @lends module:@the-/lint.rules.packageRule */
function packageRule(config) {
  const {
    depsUsedIn = [],
    devDepsUsedIn = [],
    except = [],
    ignore = '**/node_modules/**',
    ...rest
  } = config
  if (Object.keys(rest).length > 0) {
    console.warn(`[packageRule] Unknown options`, Object.keys(rest))
  }
  const _json = ({ content, filename }) => {
    try {
      return JSON.parse(content)
    } catch (e) {
      throw new Error(`[@the-/lint] Failed to parse as json: ${filename}`)
    }
  }
  const _parse = ({ content, filename }) => {
    try {
      return parse(content)
    } catch (e) {
      throw new Error(`[@the-/lint] Failed to parse js: ${filename}`)
    }
  }
  const peerDependencyNamesFor = (moduleId) => {
    try {
      const pkg = require(`${moduleId}/package.json`)
      const { peerDependencies = {} } = pkg
      return Object.keys(peerDependencies)
    } catch (e) {
      return []
    }
  }
  return async function packageRuleCheck({ content, filename, report }) {
    const pkg = _json({ content, filename })
    const doCheck = async (deps, usedIn, { as }) => {
      if (!deps) {
        return
      }
      const depsNames = Object.keys(deps)
      const peerDepsNames = depsNames.reduce(
        (peerDepsNames, depName) => [
          ...peerDepsNames,
          ...peerDependencyNamesFor(depName),
        ],
        [],
      )
      const unusedNames = new Set(
        depsNames
          .filter((name) => !except.includes(name))
          .filter((name) => !peerDepsNames.includes(name))
          .filter(
            (name) =>
              !except.some(
                (ex) => !!name.match && name.match(parsePattern(ex)),
              ),
          ),
      )
      for (const filename of await aglob(usedIn, { ignore })) {
        const content = String(await readFileAsync(filename))
        const parsed = _parse({ content, filename })
        const stringLiterals = finder.findByTypes(parsed, [
          NodeTypes.StringLiteral,
        ])
        for (const name of unusedNames) {
          const used = stringLiterals.some(
            (str) => str.value === name || str.value.indexOf(`${name}/`) === 0,
          )
          if (used) {
            unusedNames.delete(name)
          }
        }
        const done = unusedNames.size === 0
        if (done) {
          return
        }
      }
      const ok = unusedNames.size === 0
      !ok &&
        report('Unused dependencies detected', {
          actual: false,
          as,
          dependencies: [...unusedNames.values()],
          expect: true,
          where: path.resolve(filename),
        })
    }
    await doCheck(pkg.dependencies, depsUsedIn, { as: 'dependencies' })
    await doCheck(pkg.devDependencies, devDepsUsedIn, { as: 'devDependencies' })
  }
}

module.exports = packageRule