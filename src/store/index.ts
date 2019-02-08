import  thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { State, reducer, initialState } from '../reducers';

const store = createStore<State>(reducer, initialState, applyMiddleware(thunk));

export default store
