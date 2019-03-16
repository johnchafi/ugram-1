import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import {Cookies} from "react-cookie";

interface Props extends RouteProps {
    isAuthenticated: boolean;
    cookies: Cookies;
    authUser: (token:string) => any
    location: string
}


interface State {
    askForLog: boolean
}

class ProtectedRoute extends React.Component<Props, State>{

    constructor(props : Props){
        super(props);
        this.state = {
            askForLog:false,
        };
    }

    componentWillMount(): void {
        this.props.authUser(this.props.cookies.get("token"));
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.isAuthenticated && !this.props.cookies.get("token"))
            this.props.authUser(null);
    }


    public render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to={{pathname: "/login"}}/>
        }
        else if (this.props.isAuthenticated)
            return <Route {...this.props}/>;
    }
}

export default ProtectedRoute;
