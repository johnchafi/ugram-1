import * as React from 'react'
import {Button} from "reactstrap";
import {FormEvent} from "react";
interface Props {
    isAuthenticated: boolean
    handleSubmit: () => void
}
interface State {
    value: string
}


class Auth extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            value: ''
        };
        this._updateValue = this._updateValue.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    _updateValue(value: string) {
        this.setState({ value })
    }

    _handleSubmit()
    {
        this.props.handleSubmit();
        this.setState({ value: '' })
    }
    render() {
        const { value } = this.state;
        const { _updateValue, _handleSubmit } = this;
        return (
           <div>
               <form onSubmit={_handleSubmit}>
                   <input type="text" value={value} onChange={e => _updateValue(e.target.value)} />
                   <button type="submit">Connexion</button>
               </form>
            </div>
        );
    }
}

export default Auth;