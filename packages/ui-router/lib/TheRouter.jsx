'use strict'

import c from 'classnames'
import React from 'react'
import {
  BrowserRouter,
  HashRouter,
  Router as AbstractRouter,
  StaticRouter,
} from 'react-router-dom'
import { htmlAttributesFor } from '@the-/util-ui'

/**
 * Router of the-components
 */
class TheRouter extends React.Component {
  componentDidMount() {
    const {
      props: { forceRefresh, history },
    } = this
    if (history) {
      this.unlisten = history.listen(() => {
        if (forceRefresh) {
          this.forceUpdate()
        }
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {
      props: { history },
    } = this

    if (history) {
      const historyChanged = prevProps.history && prevProps.history !== history
      if (historyChanged) {
        throw new Error('[TheRouter] You cannot change <TheRouter history>')
      }

      this.unlisten = history.listen(() => {
        this.forceUpdate()
      })
    }
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten()
  }

  render() {
    const {
      props,
      props: {
        basename,
        children,
        className,
        getUserConfirmation,
        history,
        keyLength,
      },
    } = this

    const Router = history ? AbstractRouter : BrowserRouter
    return (
      <Router
        basename={basename}
        getUserConfirmation={getUserConfirmation}
        history={history}
        keyLength={keyLength}
      >
        <div
          {...htmlAttributesFor(props, { except: ['className'] })}
          className={c('the-router', className)}
        >
          {children}
        </div>
      </Router>
    )
  }
}

TheRouter.Hash = function Hash({
  basename,
  children,
  getUserConfirmation,
  hashType,
}) {
  return (
    <HashRouter
      basename={basename}
      getUserConfirmation={getUserConfirmation}
      hashType={hashType}
    >
      <div className='the-router-hash'>{children}</div>
    </HashRouter>
  )
}

TheRouter.Static = function Static({ basename, children, context, location }) {
  return (
    <StaticRouter basename={basename} context={context} location={location}>
      <div className='the-router-static'>{children}</div>
    </StaticRouter>
  )
}

TheRouter.propTypes = {}

TheRouter.defaultProps = {}

TheRouter.displayName = 'TheRouter'

export default TheRouter
