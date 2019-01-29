import { ActionCreator } from 'redux';
import {SimpleAction} from "../types/index";
export const simpleAction: ActionCreator<SimpleAction> = () => ({
    type: '@@SIMPLE_ACTION'
});