import * as React from 'react'
import {Route, Switch } from 'react-router-dom';
import NavBar from "./Navbar/NavBar";
interface Props {
}
interface State {
    isOpen: boolean
}


class App extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <NavBar/>
        );
    }
}

export default App;