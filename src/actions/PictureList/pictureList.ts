
/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better
 */
import axios from "axios";
import {Dispatch} from "redux";
import {IStatePicturesApp} from "../../reducers/PictureList/PictureList";

export enum ActionTypes {
    GET_PICTURES = 'GET_PICTURES',
    ERROR = "ERROR",
}


const api= axios.create({
    baseURL: 'http://api.ugram.net'
});

const setAuthorization = () => {

    api.interceptors.request.use((config) => {
        config.headers.Authorization = 'Bearer ' + "b0453abc-0284-40c1-b2be-762d97088e58";
        return config;
    });

};

/*
 * Define return types of our actions
 * Every action returns a type and a payload
 */
export interface AuthenticatedAction { type: ActionTypes, payload: IStatePicturesApp }

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function getAllPicturesUser(userid: string): any {
    setAuthorization();
    return function(dispatch : Dispatch<IStatePicturesApp>) {
        axios.get('http://api.ugram.net/users/' + userid + '/pictures')
            .then(function (response) {
                // response.data;
                dispatch(  {
                    type: ActionTypes.GET_PICTURES,
                    payload: {
                        isAuthenticated: true,
                        pictures: response.data.items,
                    }
                })
            })
            .catch(function (error) {
                dispatch( {
                    type: ActionTypes.ERROR,
                    payload: {
                        isAuthenticated: false,
                        pictures: null,
                    }
                })
            });
    }
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = AuthenticatedAction
