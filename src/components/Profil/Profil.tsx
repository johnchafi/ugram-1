import * as React from 'react'
import User from "../../models/User";
export interface Props {
    isAuthenticated: boolean
    getProfil: (string) => any
    user : User
    status: number,
    userid: string,
    match: {params : {id: string}}
    location:{pathname:string}
}
interface State {
}


class Profil extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        console.log(this.props.match.params.id);
        this.props.getProfil(this.props.match.params.id);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.location.pathname !== this.props.location.pathname)
            this.props.getProfil(nextProps.match.params.id);
    }

    render(): React.ReactNode {
        return (
            <div>
                {JSON.stringify(this.props.user)}
            </div>
        );
    }
}

export default Profil;
