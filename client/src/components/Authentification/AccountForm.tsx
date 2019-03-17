import * as React from 'react'
import {Button, Snackbar, TextField} from "@material-ui/core";
import {Redirect, Route, RouteProps} from 'react-router';
import User from "../../models/User";
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
interface Props{
    createUser: (user: User) => any,
    closeMessage: () => any
    message:string
    open:boolean
    variant:string
}
interface State {
    confPassword: string
    user:User,
    errorMail: string
    errorTel: string,
    errorFirstName: string,
    errorLastName: string,
    errorMdp: string
    errorId: string
}


class AccountForm extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            user: {
                email: '',
                firstName: '',
                id: '',
                lastName: '',
                password: '',
                phoneNumber: 0
            },
            confPassword: '',
            errorMail : null,
            errorTel : null,
            errorFirstName : null,
            errorLastName : null,
            errorMdp: null,
            errorId: null
        };
    }


    _updateUsername = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                email: event.target.value
            }
        });
        this.validate();
    };


    _updateFirstName = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                firstName: event.target.value
            }
        });
        this.validate();
    };

    _updateLastName = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                lastName: event.target.value
            }
        });
        this.validate();
    };

    _updatePhone = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                phoneNumber: event.target.value
            }
        });
        this.validate();
    };


    _updatePseudo = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                id: event.target.value
            }
        });
        this.validate();
    };

    _updatePassword = (event) =>  {
        this.setState({
            user: {
                ...this.state.user,
                password: event.target.value
            }
        });
        this.validate();
    };

    _updateConfPassword = (event) =>  {
        this.setState({ confPassword: event.target.value });
        this.validate();
    };

    _handleSubmit = event => {
        if (this.validate() === 0)
        this.props.createUser(this.state.user);
    };

    handleClose = (event, reason) : void => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.closeMessage();
    };

    validate() : number {
        let nbErrors : number = 0;

        let emailReg : RegExp =  new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}");
        let numberReg : RegExp = new RegExp("^[0-9-+s()]*$");
        if (!emailReg.test(this.state.user.email)) {
            this.setState({errorMail: "Email incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorMail: null});
        }
        if (!numberReg.test(this.state.user.phoneNumber.toString())) {
            this.setState({errorTel: "Numéro de téléphone incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorTel: null});
        }
        if (this.state.user.firstName.length === 0) {
            this.setState({errorFirstName: "Prénom incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorFirstName: null});
        }
        if (this.state.user.lastName.length === 0) {
            this.setState({errorLastName: "Nom incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorLastName: null});
        }

        if (this.state.user.id.length < 3) {
            this.setState({errorId: "Pseudo Incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorId: null});
        }

        if (this.state.user.password !== this.state.confPassword) {
            this.setState({errorMdp: "Les mots de passe se coincide pas"});
            nbErrors++;
        }
        else {
            this.setState({errorMdp: null});
        }
        return nbErrors;
    }

    render() {
        const {user, confPassword } = this.state;
        const { _updateUsername, _updatePassword, _handleSubmit, _updateConfPassword, _updatePseudo, _updateFirstName, _updateLastName, _updatePhone} = this;
        return (
            <div>
                <TextField error={this.state.errorMail !== null} helperText={this.state.errorMail} margin="normal" label="Email" defaultValue={user.email} onChange={(e) => _updateUsername(e)} fullWidth/>
                <TextField error={this.state.errorFirstName !== null} helperText={this.state.errorFirstName} margin="normal" label="Prénom" defaultValue={user.firstName} onChange={(e) => _updateFirstName(e)} fullWidth/>
                <TextField error={this.state.errorLastName !== null} helperText={this.state.errorLastName} margin="normal" label="Nom" defaultValue={user.lastName} onChange={(e) => _updateLastName(e)} fullWidth/>
                <TextField error={this.state.errorTel !== null} helperText={this.state.errorTel} margin="normal" label="Numéro de téléphone" defaultValue={user.phoneNumber} onChange={(e) => _updatePhone(e)} fullWidth/>
                <TextField error={this.state.errorId !== null} helperText={this.state.errorId} type="normal" margin="normal" label="Pseudo" defaultValue={user.id} onChange={(e) => _updatePseudo(e)} fullWidth/>
                <TextField error={this.state.errorMdp !== null} helperText={this.state.errorMdp} type="password" margin="normal" label="Mot de passe" defaultValue={user.password} onChange={(e) => _updatePassword(e)} fullWidth/>
                <TextField error={this.state.errorMdp !== null} helperText={this.state.errorMdp} type="password" margin="normal" label="Confirmation mot de passe" defaultValue={confPassword} onChange={(e) => _updateConfPassword(e)} fullWidth/>
                <Button onClick={_handleSubmit} >Créer un compte</Button>
                {this.props.variant && <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.props.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <MySnackbarContentWrapper onClose={this.handleClose} variant={this.props.variant} message={this.props.message}/>
                </Snackbar>}
            </div>
        );
    }
}

export default AccountForm;
