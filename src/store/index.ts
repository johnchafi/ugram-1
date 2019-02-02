import  thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { State, reducer, initialState } from '../reducers';

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore<State>(reducer, initialState, applyMiddleware(thunk));

export default store
