import * as React from 'react';
import Picture from "../../models/Picture";
export interface Props {
    getPicturesByDate: (number: any, picture: Picture[]) => any;
    overGetPics: (picture: Picture[]) => any;
    reset: () => any;
    pictures: Picture[];
    pageNumber: number;
    finish: boolean;
}
interface State {
    isLoading: boolean;
}
declare class Home extends React.Component<Props, State> {
    constructor(props: Props);
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void;
    isBottom(el: any): boolean;
    componentWillUnmount(): void;
    trackScrolling: () => void;
    render(): JSX.Element;
}
export default Home;
