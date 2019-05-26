'use strict'

import c from 'classnames'
import { EOL } from 'os'
import PropTypes from 'prop-types'
import React from 'react'
import { styleString } from '@the-/util-style'

/**
 * Style of the-components
 */
class TheStyle extends React.PureComponent {
  static styles(values) {
    return Object(values)
  }

  getChildrenAsString() {
    const {
      props: { children },
    } = this
    if (!children) {
      return null
    }
    return []
      .concat(children)
      .map((child) => child)
      .join(EOL)
  }

  getInnerHTML() {
    return [this.getStylesAsString(), this.getChildrenAsString()]
      .filter(Boolean)
      .join(EOL)
  }

  getStylesAsString() {
    const {
      props: { prefix, styles },
    } = this
    if (!styles) {
      return null
    }
    return Object.keys(styles)
      .map((selector) =>
        styleString(
          [prefix, selector].filter(Boolean).join(' '),
          styles[selector],
        ),
      )
      .filter(Boolean)
      .join(EOL)
  }

  render() {
    const { props } = this
    const { className, id, type } = props
    return (
      <style
        className={c('the-style', className)}
        dangerouslySetInnerHTML={{ __html: this.getInnerHTML() }}
        id={id}
        type={type}
      />
    )
  }
}

TheStyle.propTypes = {
  /** CSS class name */
  className: PropTypes.string,
  /** DOM Id */
  id: PropTypes.string,
  /** Style selector prefix */
  prefix: PropTypes.string,
  /** Script type */
  type: PropTypes.string,
}

TheStyle.defaultProps = {
  className: null,
  id: null,
  prefix: null,
  type: null,
}

TheStyle.displayName = 'TheStyle'

export default TheStyle
