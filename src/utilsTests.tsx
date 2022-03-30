/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

import React, {ReactNode} from 'react'
import {render, RenderResult} from '@testing-library/react'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import {MemoryRouter, Route} from 'react-router-dom'

let testStrings = {
  'test.string': 'string test',
  'test.values.string': 'string with values {value}'
}

const timeZoneWithNoOffset = 'America/Danmarkshavn'

export const setTestStrings = (strings): void => {
  testStrings = {
    ...testStrings,
    ...strings
  }
}

export const renderComponent = (children, options = {}, language = 'en'): RenderResult => {
  return render(
    <IntlProvider locale={language} messages={testStrings}>
      {children}
    </IntlProvider>,
    options
  )
}

export const renderComponentWithRouter = (children, path = '/', options = {}, language = 'en'): RenderResult => {
  return renderComponent(
    <MemoryRouter initialEntries={[path]}>
      {children}
    </MemoryRouter>,
    options,
    language
  )
}

export function renderContainer (store, children, path = '/', options = {}, language = 'en'): ReactNode {
  return render(
    <Provider store={store}>
      <IntlProvider locale={language} messages={testStrings} timeZone={timeZoneWithNoOffset}>
        <MemoryRouter initialEntries={[path]}>
          {children}
        </MemoryRouter>
      </IntlProvider>
    </Provider>, options
  )
}

export function renderContainerWithRoute (
  store,
  children,
  path = '/',
  matchPath = '/',
  options = {},
  language = 'en'
): ReactNode {
  return render(
    <Provider store={store}>
      <IntlProvider locale={language} messages={testStrings} timeZone={timeZoneWithNoOffset}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={matchPath}>
            {children}
          </Route>
        </MemoryRouter>
      </IntlProvider>
    </Provider>, options
  )
}
