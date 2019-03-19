import { connect } from "react-redux";
import {State} from "../../reducers";
import { withRouter } from "react-router-dom";
import Upload from "../../components/Picture/Upload";
import {uploadPicture} from "../../actions/Picture/picture";
import {getUserProfil} from "../../selectors/Profil/Profil";

const mapStateToProps = (state: State) => ({
    user: getUserProfil(state)
});

const mapDispatchToProps = {
    uploadPicture: uploadPicture
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Upload))
