import { connect } from 'react-redux'
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import {deletePicture} from "../../actions/Picture/picture";
import PictureItemHome, {Props} from "../../components/Picture/PictureItemHome";
const mapStateToProps = (state: State, ownProps: Props) => ({
    picture: ownProps.picture,
    user: ownProps.user,
    isHome: ownProps.isHome
});

const mapDispatchToProps = {
    deletePicture: deletePicture,
};


export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PictureItemHome))
