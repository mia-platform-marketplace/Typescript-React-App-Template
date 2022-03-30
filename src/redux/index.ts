/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

import {createStore, combineReducers, applyMiddleware, Store} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {NODE_ENV} from '../config'
import reducers from './reducers'

const middlewares = [thunkMiddleware]

if (NODE_ENV === 'development') {
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  })
  middlewares.push(logger)
}

const rootReducer = combineReducers(reducers)

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'pos-frontend',
  storage,
  whitelist: []
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (): Store<RootState, any> => {
  const composeEnhancers = composeWithDevTools({})
  return createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )
}

export const store = configureStore()

export const persistor = persistStore(store)
