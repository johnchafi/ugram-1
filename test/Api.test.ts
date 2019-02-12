import * as Actions from '../src/actions/Picture/picture';
import * as ActionsProfil from '../src/actions/Profil/profil';
import { sdk } from "../src/sdk/ugram";
import { registerMiddlewares } from 'redux-actions-assertions';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

export const mockStore = configureMockStore([thunk]);

// using CommonJS modules
describe('actions', () => {

    it('should get picture for home menu', async () => {
        const store = mockStore();
        await store.dispatch(Actions.getAllPicturesSortByDate(0, []));
        await store.dispatch(Actions.getAllPicturesSortByDate(1, []));
        await store.dispatch(Actions.getAllPicturesSortByDate(2, []));

        const actions = store.getActions();
        const expectedAction = [{
            type: Actions.ActionTypes.GET_PICTURE_HOME,
            payload: {
                finish: true,
                pictures: await sdk.getPictures(0)
                    .then(function (response) {
                        return response.data.items
                    }),
                pageNumber: 1
            }
        },
            {
                type: Actions.ActionTypes.GET_PICTURE_HOME,
                payload: {
                    finish: true,
                    pictures: await sdk.getPictures(1)
                        .then(function (response) {
                            return response.data.items
                        }),
                    pageNumber: 2
                }
            },
            {
                type: Actions.ActionTypes.GET_PICTURE_HOME,
                payload: {
                    finish: true,
                    pictures: await sdk.getPictures(2)
                        .then(function (response) {
                            return response.data.items
                        }),
                    pageNumber: 2
                }
            }];
        expect(expectedAction[0]).toEqual(expectedAction[0]);
        expect(expectedAction[1]).toEqual(expectedAction[1]);
        expect(expectedAction[2]).toEqual(expectedAction[2]);
    });

    it('should get picture for profil page', async () => {
        const store = mockStore();
        await store.dispatch(Actions.getPictureForProfil("team02", 0, []));

        const actions = store.getActions();
        const expectedAction = [{
            type: Actions.ActionTypes.GET_PICTURE_PROFIL,
            payload: {
                pictures: await sdk.getPicturesByUser('team02', 0)
                    .then(function (response) {
                        return response.data.items
                    }),
                pageNumber: 1
            }
        }];
        expect(expectedAction[0]).toEqual(expectedAction[0]);
    });

    it('should get profil info', async () => {
        const store = mockStore();
        await store.dispatch(ActionsProfil.profilData("team02"));

        const actions = store.getActions();
        const expectedAction = [{
            type: ActionsProfil.ActionTypes.PROFIL,
            payload: {
                user: await sdk.getUser('team02')
                    .then(function (response) {
                        return response.data;
                    })
            }
        }];
        expect(expectedAction[0]).toEqual(expectedAction[0]);
    })
});
