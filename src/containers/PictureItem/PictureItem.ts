import { connect } from 'react-redux'
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import PictureItem, {Props} from "../../components/PictureItem/PictureItem";
const mapStateToProps = (state: State, ownProps: Props) => ({
    picture: ownProps.picture,
});


export default withRouter(connect<any, any, any>(mapStateToProps)(PictureItem))
