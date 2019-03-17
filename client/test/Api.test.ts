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
        await store.dispatch(Actions.getPictureForProfil("riton", 0, []));

        let response = await sdk.getPicturesByUser('riton', 0)
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
});
