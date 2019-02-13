import  thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { State, reducer, initialState } from '../reducers';
import logger from 'redux-logger'

const store = createStore<State>(reducer, initialState, applyMiddleware(thunk, logger));

export default store
