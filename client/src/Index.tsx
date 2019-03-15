import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

require('../scss/app.scss');
import RouterConfig from "./config/RouterConfig";
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <RouterConfig />
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById('app') as HTMLElement
);
