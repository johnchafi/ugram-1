import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store'
require('../scss/app.scss');
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";
import AuthForm from "./containers/Authentifcation/AuthForm";
import Profil from "./containers/Profil/Profil";
import Users from "./containers/Users/Users";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.Fragment>
                <App/>
                <Switch>
                    <Route path='/login' component={AuthForm}/>
                    <Route path='/profil' component={() => <Profil userid={"wfortin"}/>}/>
                    <Route path='/users' component={() => <Users />}/>
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app') as HTMLElement
);
