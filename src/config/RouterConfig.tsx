import * as React from 'react'
import NavBar from "../view-components/NavBar";
import AuthForm from "../containers/Authentifcation/AuthForm";
import Profil from "../containers/Profil/Profil";
import Users from "../containers/UserList/UserList";
import { HashRouter, Route, Switch } from "react-router-dom";
import { createHistory } from 'history';
import { Provider } from 'react-redux';


const RouterConfig = ({store}) =>(
    <Provider store={store}>
        <HashRouter>
            <React.Fragment>
                <NavBar/>
                <Switch>
                    <Route path='/login' component={AuthForm}/>
                    <Route exact path='/profil/:id'  component={Profil} />
                    <Route path='/users' component={() => <Users />}/>
                </Switch>
            </React.Fragment>
        </HashRouter>
    </Provider>
);


export default RouterConfig;
