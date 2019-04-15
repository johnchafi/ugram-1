import  thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux";
import { State, reducer, initialState } from "../reducers";
import { LOCATION_CHANGE } from 'react-router-dom';

const store = createStore<State>(reducer, initialState, applyMiddleware(thunk));

export default store
