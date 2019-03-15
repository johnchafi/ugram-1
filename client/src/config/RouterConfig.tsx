import * as React from 'react'
import NavBar from "../view-components/NavBar";
import AuthForm from "../containers/Authentifcation/AuthForm";
import Profil from "../containers/Profil/Profil";
import Users from "../containers/Users/UserList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createHistory } from 'history';
import store from '../store';
import {Cookies, withCookies} from 'react-cookie';
import { Provider } from 'react-redux';
import Home from "../containers/Home/Home";
import {Component} from "react";

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
                    <React.Fragment>
                        <NavBar/>
                        <Switch>
                            <Route path='/login' render={() => (<AuthForm cookies={this.props.cookies}/>)}/>
                            <Route exact path="/" component={Home}/>
                            <Route path='/profil/:id/' component={Profil}/>
                            <Route path='/users' component={() => <Users/>}/>
                        </Switch>
                    </React.Fragment>
                </BrowserRouter>
            </Provider>
        )
    }
}
export default withCookies(RouterConfig);
