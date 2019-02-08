import * as React from 'react';
import { FormEvent } from "react";
import User from "../../models/User";
interface Props {
    isAuthenticated: boolean;
    user: User;
    handleSubmit: (username: string, password: string) => void;
}
interface State {
    username: string;
    password: string;
}
declare class AuthForm extends React.Component<Props, State> {
    constructor(props: Props);
    _updateUsername(username: string): void;
    _updatePassword(password: string): void;
    _handleSubmit(e: FormEvent<any>): void;
    render(): JSX.Element;
}
export default AuthForm;
