import * as React from 'react'
import NavBar from "../containers/Navbar/Navbar";
import AuthForm from "../containers/Authentifcation/AuthForm";
import Profil from "../containers/Profil/Profil";
import Explore from "../containers/Explore/Explore";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import store from '../store';
import { Provider } from 'react-redux';
import Home from "../containers/Home/Home";
import Tags from "../containers/Explore/Tags";
import {Component} from "react";
import {withCookies} from "react-cookie";
import ProtectedRoute from "../containers/Authentifcation/ProtectedRoute";
import { LastLocationProvider } from 'react-router-last-location';
import AccountForm from "../containers/Authentifcation/AccountForm";
import * as ReactGA from 'react-ga';

interface Props {
    cookies? : any
}

interface State {
    token : string
}


class RouterConfig extends Component<Props, State> {
    constructor(props : Props) {
        super(props);
    }


    componentDidMount() {
        ReactGA.pageview(window.location.pathname)
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
                            <Route path='/signup' render={() => (<AccountForm cookies={this.props.cookies}/>)}/>
                            <ProtectedRoute  cookies={this.props.cookies} exact path='/' render={() => (<Home/>)}/>
                            <ProtectedRoute cookies={this.props.cookies} exact path="/profil/:id/" render={() => (<Profil  cookies={this.props.cookies}/>)}/>
                            <ProtectedRoute cookies={this.props.cookies} path='/explore' render={() => (<Explore/>)}/>
                            <ProtectedRoute cookies={this.props.cookies} exact path='/tag/:tag' render={() => (<Tags />)}/>
                        </Switch>
                    </React.Fragment>
                    </LastLocationProvider>
                </BrowserRouter>
            </Provider>
        )
    }
}
export default withCookies(RouterConfig);
