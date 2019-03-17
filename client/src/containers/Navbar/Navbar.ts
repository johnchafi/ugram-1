import { connect } from 'react-redux'
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import {getAuthUser} from "../../selectors/Authentification/auth";
import NavBar from "../../view-components/NavBar";
const mapStateToProps = (state: State, ownProps: any) => ({
    cookies: ownProps.cookies,
});

const mapDispatchToProps = {
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NavBar))
