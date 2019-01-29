import { Action } from 'redux';

// Declare our action types using our interface. For a better debugging experience,
// I use the `@@context/ACTION_TYPE` convention for naming action types.

export interface simpleAction extends Action {
    type: '@@SIMPLE_ACTION';
}


export type SimpleAction = simpleAction;