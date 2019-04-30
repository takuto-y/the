/**
 * Client connection store for the-server
 * @memberOf module:@the-/server.stores
 * @class ConnectionStore
 * @augments module:@the-/server.stores.Store
 */
'use strict'

const asleep = require('asleep')
const Store = require('./Store')
const SESSION_STORE_KEY = 'the:server:connection'

/** @lends module:@the-/server.stores.ConnectionStore */
class ConnectionStore extends Store {
  constructor(storage) {
    super(storage, {
      storeKey: SESSION_STORE_KEY,
    })
    this.closed = false
  }

  async patientlyGet(cid, options = {}) {
    const { interval = 200, maxTry = 4 } = options
    for (let i = 0; i < maxTry; i++) {
      if (this.closed) {
        return null
      }
      const found = await this.get(cid)
      if (found) {
        return found
      }
      const waitDuration = interval * 2 ** (i + 1)
      await asleep(waitDuration)
    }
    return null
  }

  async set(cid, connection) {
    return super.set(cid, connection)
  }
}

module.exports = ConnectionStore
