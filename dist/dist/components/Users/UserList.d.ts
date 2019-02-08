import * as React from 'react';
import User from "../../models/User";
export interface Props {
    isAuthenticated: boolean;
    users: User[];
    getUsers: () => any;
}
interface State {
}
declare class UserList extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export default UserList;
