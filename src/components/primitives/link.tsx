import * as Headless from '@headlessui/react'
import NextLink from 'next/link'
import React, { forwardRef } from 'react'

export const Link = forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<typeof NextLink>>(
  function Link(props, ref) {
    return (
      <Headless.DataInteractive>
        <NextLink {...props} ref={ref} />
      </Headless.DataInteractive>
    )
  }
)
