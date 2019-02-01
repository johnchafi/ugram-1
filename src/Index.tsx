import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store'
require('../scss/app.scss');
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterConfig from "./config/RouterConfig";

ReactDOM.render(
    <RouterConfig store={store} />,
    document.getElementById('app') as HTMLElement
);
