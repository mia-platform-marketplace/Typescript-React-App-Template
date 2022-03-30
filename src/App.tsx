/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

import React from 'react'
import {FormattedMessage} from 'react-intl'

import logo from './logo.svg'
import './App.css'

const App: React.FC = () => (
  <div className='App'>
    <header className='App-header'>
      <img alt="logo" className='App-logo' src={logo}/>
      <p>
        <FormattedMessage id={'edit'} />
      </p>
      <a
        className='App-link'
        href='https://reactjs.org'
        rel='noopener noreferrer'
        target='_blank'
      >
        <FormattedMessage id={'learn'} />
      </a>
    </header>
  </div>
)

export default App
