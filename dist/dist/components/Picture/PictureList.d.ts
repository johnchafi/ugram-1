import * as React from 'react';
import Picture from "../../models/Picture";
import User from "../../models/User";
export interface Props {
    pictures: Picture[];
    user: User;
    isHome: boolean;
}
interface State {
}
declare class PictureList extends React.Component<Props, State> {
    constructor(props: Props);
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element[];
}
export default PictureList;
