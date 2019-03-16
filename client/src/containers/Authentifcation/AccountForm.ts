import { connect } from 'react-redux'
import {createUser} from "../../actions/Authentification/auth";
import {State} from "../../reducers";
import { withRouter } from 'react-router-dom';
import AccountForm from "../../components/Authentification/AccountForm";
import {getMessageError, getStateofStatus, getStatusProfil, getVariantString} from "../../selectors/Profil/Profil";
import {closeStatus} from "../../actions/Status/status";
const mapStateToProps = (state: State) => ({
    message: getMessageError(state),
    variant: getVariantString(state),
    open: getStateofStatus(state),
    status: getStatusProfil(state),
});

const mapDispatchToProps = {
    createUser: createUser,
    closeMessage: closeStatus
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AccountForm));
