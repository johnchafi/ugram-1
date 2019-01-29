import * as React from 'react';
import { connect } from 'react-redux';
import { simpleAction } from './actions';
import {Dispatch} from "redux";
import {SimpleAction} from "./types/index";
import userReducer from "./reducers/userReducer";

interface Props {
    simpleAction: () => {};
    result: String
}


class App extends React.Component<Props>
{
    constructor(props: Props)
    {
        super(props);
        this.simpleAction = this.simpleAction.bind(this);
    }
    render() {
        return (
            <div>
                <header>
                    <h1>Welcome to React</h1>
                </header>
                <p>
                    To get started, edit <code>src/App.js</code> and save to reload
                </p>
                <button onClick={this.simpleAction}>Test</button>
                <pre>
 {
     JSON.stringify(this.props)
 }
</pre>
            </div>
        );
    }
    simpleAction = () => {
        console.log(this.props.result);
        this.props.simpleAction();
    }
}


const mapDispatchToProps = (dispatch: Dispatch<SimpleAction>) => ({
    simpleAction: () => dispatch(simpleAction())
});
const mapStateToProps = state => {
    return {
        result: state.result
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);