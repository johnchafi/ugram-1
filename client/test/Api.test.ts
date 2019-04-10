import * as Actions from '../src/actions/Picture/picture';
import * as ActionsAuth from '../src/actions/Authentification/auth';
import * as ActionsProfil from '../src/actions/Profil/profil';
import { sdk } from "../src/sdk/ugram";
import { registerMiddlewares } from 'redux-actions-assertions';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {ActionTypes} from "../src/actions/Status/status";
import User from "../src/models/User";

export const mockStore = configureMockStore([thunk]);

const uniqueUserId = "TheWeed78Rhey1049";

// using CommonJS modules
describe('actions', () => {

    it('should get picture for home menu', async () => {
        const store = mockStore();
        await store.dispatch(Actions.getAllPicturesSortByDate(0, []));

        const actions = store.getActions();
        let response = await sdk.getPictures(0)
            .then(function (response) {
                return response
            });
        let pageNumber = 0;
        if (response.data.totalPages >= 1)
            pageNumber = 1;
        const expectedAction = [{
            type: Actions.ActionTypes.GET_PICTURE_HOME,
            payload: {
                finish: true,
                pictures: response.data.items,
                pageNumber: pageNumber
            }
        }];
        expect(expectedAction[0]).toEqual(actions[0]);
    });

    it('should get picture for profil page', async () => {
        const store = mockStore();
        await store.dispatch(Actions.getPictureForProfil(uniqueUserId, 0, []));

        let response = await sdk.getPicturesByUser(uniqueUserId, 0)
            .then(function (response) {
                return response;
            });
        const actions = store.getActions();
        let pageNumber = 0;
        if (response.data.totalPages >= 1)
            pageNumber = 1;
        const expectedAction = [{
            type: Actions.ActionTypes.GET_PICTURE_PROFIL,
            payload: {
                pictures: response.data.items,
                pageNumber: pageNumber,
                totalEntries: response.data.totalEntries
            }
        }];
        expect(expectedAction[0]).toEqual(actions[0]);
    });

    it('should display an error for profil page', async () => {
        const store = mockStore();
        await store.dispatch(Actions.getPictureForProfil("toto", 0, []));
        const actions = store.getActions();
        const expectedAction = [{
            type: Actions.ActionTypes.ERROR,
            payload: {
                pictures: null
            }
        }];
        expect(expectedAction[0]).toEqual(actions[0]);
    });

    it('should display error for creating user', async () => {
        const store = mockStore();
        let user: User;
        await store.dispatch(ActionsAuth.createUser(user));
        let error = await sdk.createUser(user)
            .then(function (response) {
                return response;
            }).catch(error => {
                return error;
            });
        const actions = store.getActions();
        const expectedAction = [{
            type: ActionTypes.ERROR,
            payload: {
                status: error.response.status,
                message:  error.response.data.message,
                variant: "error"
            }
        }];
        expect(expectedAction[0]).toEqual(actions[0]);
    });


    it('should display error for route login/token', async () => {
        const store = mockStore();
        let user: User = {};
        user.id = "toto";
        await store.dispatch(ActionsAuth.getUserWithToken(''));
        let error = await sdk.getUserByToken('')
            .then(function (response) {
                return response;
            }).catch(error => {
                return error;
            });
        const actions = store.getActions();
        const expectedAction = [{
            type: "ERROR-AUTH",
            payload: {
                isAuthenticated: false,
                user: null
            }
        }];
        expect(expectedAction[0]).toEqual(actions[0]);
    });

    it('should display error for getting fake user', async () => {
        const store = mockStore();
        await store.dispatch(ActionsProfil.profilData('toot'));
        let error = await sdk.getUser('toot')
            .then(function (response) {
                return response;
            }).catch(error => {
                return error;
            });
        const actions = store.getActions();
        const expectedAction = [{
            type: "ERROR_USER",
            payload: {
                user: null,
                message: error
            }
        }];
        expect(expectedAction[0]).toEqual(actions[0]);
    });
    it('should display good for getting real user', async () => {
        const store = mockStore();
        await store.dispatch(ActionsProfil.profilData(uniqueUserId));
        let response = await sdk.getUser(uniqueUserId)
            .then(function (response) {
                return response;
            }).catch(error => {
                return error;
            });
        const actions = store.getActions();
        const expectedAction = [{
            type: "PROFIL",
            payload: {
                user: response.data,
            }
        }];
        expect(expectedAction[0]).toEqual(actions[0]);
    });
});
