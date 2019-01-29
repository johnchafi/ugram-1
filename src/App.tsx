import * as React from 'react';
import { connect } from 'react-redux';
import { simpleAction } from './actions';
import {Component} from "react";
class App extends Component
{
    render() {
        return (
            <div>
                <header>
                    <h1>Welcome to React</h1>
                </header>
                <p>
                    To get started, edit <code>src/App.js</code> and save to reload
                </p>
                <button onClick={this.simpleAction}>Test redux action</button>
                <pre>
 {
     JSON.stringify(this.props)
 }
</pre>
            </div>
        );
    }
    simpleAction = () => {
        //this.props.simpleAction();
    }
}
const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});
const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);