import * as React from 'react'
import NavBar from "../containers/Navbar/Navbar";
import AuthForm from "../containers/Authentifcation/AuthForm";
import Profil from "../containers/Profil/Profil";
import Users from "../containers/Users/UserList";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createHistory } from 'history';
import store from '../store';
import { Provider } from 'react-redux';
import Home from "../containers/Home/Home";
import {Component} from "react";
import {withCookies} from "react-cookie";
import ProtectedRoute from "../containers/Authentifcation/ProtectedRoute";
import { LastLocationProvider } from 'react-router-last-location';
import AccountForm from "../containers/Authentifcation/AccountForm";

interface Props {
    cookies? : any
}

class RouterConfig extends Component<Props> {
    constructor(props : Props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <LastLocationProvider>
                    <React.Fragment>
                        <NavBar cookies={this.props.cookies}/>
                        <Switch>
                            <Route path='/login' render={() => (<AuthForm  cookies={this.props.cookies}/>)}/>
                            <Route path='/signup' render={() => (<AccountForm/>)}/>
                            <ProtectedRoute  cookies={this.props.cookies} exact path='/' render={() => {
                                return <Home/>}}/>
                            <ProtectedRoute cookies={this.props.cookies} exact path="/profil/:id/" render={() => (<Profil  cookies={this.props.cookies}/>)}/>
                            <ProtectedRoute cookies={this.props.cookies} path='/users' render={() => (<Users/>)}/>
                        </Switch>
                    </React.Fragment>
                    </LastLocationProvider>
                </BrowserRouter>
            </Provider>
        )
    }
}
export default withCookies(RouterConfig);
