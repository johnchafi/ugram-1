import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
require('../scss/app.scss');
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthForm from "./containers/Authentifcation/AuthForm";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={App} />
                <Route path="/login" component={AuthForm}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app') as HTMLElement
);
