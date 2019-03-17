import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import {Cookies} from "react-cookie";

interface Props extends RouteProps {
    isAuthenticated: boolean;
    cookies: Cookies;
    authUser: (token:string) => any
    checkToken: (token:string) => any
    location: string
    token : string
    userId : string
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
        if (this.props.cookies.get("token"))
            this.props.authUser(this.props.cookies.get("token"));
    }

    checkCookie(token:string, userId: string)
    {

        if (token !== null && token !== this.props.cookies.get('token') || userId !== null && userId !== this.props.cookies.get("userid") ) {
            this.props.authUser(null);
            this.props.cookies.remove('token');
            this.props.cookies.remove('userid');
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.isAuthenticated && (!this.props.cookies.get("token") || !this.props.cookies.get("userid"))) {
            this.props.authUser(null);
        }
    }


    public render() {
        if (!this.props.isAuthenticated) {
            if (!this.state.askForLog)
                return <div/>;
            return <Redirect to={{pathname: "/login"}}/>
        }
        else if (this.props.isAuthenticated) {
            setInterval(function () {this.checkCookie(this.props.token, this.props.userId) }.bind(this), 100);
            return <Route {...this.props}/>;
        }
    }
}

export default ProtectedRoute;
