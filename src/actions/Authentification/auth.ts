
/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better
 */
export enum ActionTypes {
    AUTHENTICATED = 'AUTH',
}

/*
 * Define return types of our actions
 * Every action returns a type and a payload
 */
export interface AuthenticatedAction { type: ActionTypes.AUTHENTICATED, payload: { isAuthenticated: boolean } }

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function authUser(): AuthenticatedAction {
console.log("je passe ici  : " + ActionTypes.AUTHENTICATED);
    return {
        type: ActionTypes.AUTHENTICATED,
        payload: {
           isAuthenticated: true
        }
    }
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = AuthenticatedAction