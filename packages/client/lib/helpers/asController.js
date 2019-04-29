/**
 * @memberof helpers
 * @function asController
 */
'use strict'

/** @lends asController */
function asController(instance, spec, context, options = {}) {
  const { onToggleHandler = () => null } = options
  return Object.assign(
    {
      callbacks: {},
      controllerName: spec.name,
    },
    ...Object.keys(spec.methods).map((name) => ({
      [name]: async function methodProxy(...args) {
        const result = await instance[name](context, ...args)
        return result
      }.bind(this),
    })),
    {
      delCallback(...handlerNames) {
        for (const handleName of handlerNames) {
          delete this.callbacks[handleName]
          onToggleHandler(handleName, false)
        }
      },
      setCallback(handleName, callback) {
        let callbacks
        if (arguments.length >= 2) {
          callbacks = { [handleName]: callback }
        } else {
          callbacks = arguments[0] || {}
        }
        for (const [handleName, callback] of Object.entries(callbacks)) {
          onToggleHandler(handleName, !!callback)
        }
        this.callbacks = { ...this.callbacks, ...callbacks }
      },
    },
  )
}

module.exports = asController
