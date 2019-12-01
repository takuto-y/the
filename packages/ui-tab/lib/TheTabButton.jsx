'use strict'

import c from 'classnames'
import React from 'react'
import TheButton from '@the-/ui-button/shim/TheButton'

export default function TheTabButton(props) {
  const {
    active,
    children,
    className,
    disableTouchAction,
    movingRate,
    ...buttonProps
  } = props
  return (
    <TheButton
      {...buttonProps}
      className={c('the-tab-button', className, {
        'the-tab-button-active': active,
      })}
    >
      {active && (
        <span
          className='the-tab-button-active-bar'
          style={{
            transform: !disableTouchAction
              ? `translateX(${movingRate * -100}%)`
              : 'none',
          }}
        />
      )}
      {children}
    </TheButton>
  )
}
