import * as React from 'react'
import NavBar from "../view-components/NavBar";
import AuthForm from "../containers/Authentifcation/AuthForm";
import Profil from "../containers/Profil/Profil";
import Users from "../containers/Users/Users";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';


const RouterConfig = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <React.Fragment>
                <NavBar/>
                <Switch>
                    <Route path='/login' component={AuthForm}/>
                    <Route path='/profil' component={() => <Profil userid={"wfortin"}/>}/>
                    <Route path='/users' component={() => <Users />}/>
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    </Provider>
);


export default RouterConfig;
