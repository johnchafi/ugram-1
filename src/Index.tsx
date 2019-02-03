import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store';
require('../scss/app.scss');
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterConfig from "./config/RouterConfig";
import { HashRouter } from 'react-router-dom';
ReactDOM.render(
    <HashRouter>
        <RouterConfig store={store} />
    </HashRouter>,
    document.getElementById('app') as HTMLElement
);
