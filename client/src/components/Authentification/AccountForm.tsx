import * as React from 'react'
import {Button, Grid, Hidden, Snackbar, TextField} from "@material-ui/core";
import {Redirect, Route, RouteProps} from 'react-router';
import User from "../../models/User";
import MySnackbarContentWrapper from "../../view-components/MySnackBarContentWrapper";
import {GoogleLogin} from "react-google-login";
import {Link} from 'react-router-dom';
import {Cookies} from "react-cookie";

interface Props{
    createUser: (user: User) => any,
    authUser: (email:string, password:string) => any,
    closeMessage: () => any
    message:string
    status: number
    open:boolean
    isAuthenticated: boolean
    variant:string,
    cookies: Cookies
    token: string
    userid: string
}
interface State {
    errorMail: string,
    user:User,
    errorTel: string,
    errorFirstName: string,
    errorLastName: string,
    errorMdp: string,
    errorId: string
}


class AccountForm extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            user: {
                confPassword: '',
                email: '',
                firstName: '',
                id: '',
                lastName: '',
                password: '',
                phoneNumber: null,

            },
            errorMail : null,
            errorTel : null,
            errorFirstName : null,
            errorLastName : null,
            errorMdp: null,
            errorId: null
        };
    }


    _updateUsername = (event) => {
        this.state.user.email = event.target.value;

        this.validate();
    };

    componentWillUnmount() {
        this.props.closeMessage();
    }


    _updateFirstName = (event) => {
        this.state.user.firstName = event.target.value;

        this.validate();
    };

    _updateLastName = (event) => {
        this.state.user.lastName = event.target.value;

        this.validate();
    };

    _updatePhone = (event) => {
        this.state.user.phoneNumber = event.target.value;

        this.validate();
    };


    _updatePseudo = (event) => {
        this.state.user.id = event.target.value;

        this.validate();
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        console.log(nextProps);
        if (nextProps.status === 201){
            this.props.authUser(this.state.user.email, this.state.user.password);
        }
        if (nextProps.isAuthenticated)
        {
            this.props.cookies.set('token', nextProps.token, {path: '/'});
            this.props.cookies.set('userid', nextProps.userid, { path: '/' });
        }
    }

    _updatePassword = (event) =>  {
        this.state.user.password = event.target.value;

        this.validate();
    };

    _updateConfPassword = (event) =>  {
        this.state.user.confPassword = event.target.value;
        this.validate();
    };

    _handleSubmit = event => {
        event.preventDefault();
        if (this.validate())
            this.props.createUser(this.state.user);
    };

    handleClose = (event, reason) : void => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.closeMessage();
    };

    validate() : boolean {
        let check : boolean = true;

        let emailReg : RegExp =  new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}");
        let numberReg : RegExp = new RegExp("^[0-9]*$");

        if (this.state.user.email && !emailReg.test(this.state.user.email)) {
            this.setState({errorMail: "Email incorrect"});
            check = false;
        }
        else {
            this.setState({errorMail: null});
        }

        if (this.state.user.phoneNumber && (!(numberReg.test(this.state.user.phoneNumber.toString())) || !(this.state.user.phoneNumber.toString().length == 10))) {

            this.setState({errorTel: "Numéro de téléphone incorrect"});
            check = false;
        }
        else {
            this.setState({errorTel: null});
        }
        if (this.state.user.firstName && this.state.user.firstName.length === 0) {
            this.setState({errorFirstName: "Prénom incorrect"});
            check = false;
        }
        else {
            this.setState({errorFirstName: null});
        }
        if (this.state.user.lastName && this.state.user.lastName.length === 0) {
            this.setState({errorLastName: "Nom incorrect"});
            check = false;
        }
        else {
            this.setState({errorLastName: null});
        }

        if (this.state.user.id && this.state.user.id.length < 3) {
            this.setState({errorId: "Pseudo Incorrect"});
            check = false;
        }
        else {
            this.setState({errorId: null});
        }

        if (this.state.user.password && this.state.user.password !== this.state.user.confPassword) {
            this.setState({errorMdp: "Les mots de passe se coincide pas"});
            check = false;
        }
        else {
            this.setState({errorMdp: null});
        }
        return check;
    }

    responseGoogle = response => {

    };

    render() {
        const {user } = this.state;
        const { _updateUsername, _updatePassword, _handleSubmit, _updateConfPassword, _updatePseudo, _updateFirstName, _updateLastName, _updatePhone} = this;
        if (this.props.isAuthenticated)
            return <Redirect to={'/'}/>;
        return (

            <Grid container justify="center" alignItems="center">
                <Grid className="LoginPage">
                    <form className={"containerForm register"} onSubmit={(e) => _handleSubmit(e)}>
                        <div className={"up"}>
                            <img className={"logo"} alt="label" src="https://s3.ca-central-1.amazonaws.com/ugram-team02/assets/header-picture.png" />
                            <p>Inscrivez-vous pour voir les<br />photos et vidéos de vos amis.</p>
                        </div>

                        <GoogleLogin
                            clientId="782927614430-as1qgn7v6a07qm28r3aqk119rnj7je21.apps.googleusercontent.com"
                            buttonText="Se connecter avec Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                        <div className={"or"}>
                            <p>OU</p>
                        </div>

                        <TextField className={"input"} error={this.state.errorMail !== null} helperText={this.state.errorMail} margin="normal" label="Email" defaultValue={user.email} onChange={(e) => _updateUsername(e)} fullWidth/>
                        <TextField className={"input"} error={this.state.errorFirstName !== null} helperText={this.state.errorFirstName} margin="normal" label="Prénom" defaultValue={user.firstName} onChange={(e) => _updateFirstName(e)} fullWidth/>
                        <TextField className={"input"} error={this.state.errorLastName !== null} helperText={this.state.errorLastName} margin="normal" label="Nom" defaultValue={user.lastName} onChange={(e) => _updateLastName(e)} fullWidth/>
                        <TextField className={"input"} error={this.state.errorTel !== null} helperText={this.state.errorTel} margin="normal" label="Numéro de téléphone" defaultValue={user.phoneNumber} onChange={(e) => _updatePhone(e)} fullWidth/>
                        <TextField className={"input"} error={this.state.errorId !== null} helperText={this.state.errorId} type="normal" margin="normal" label="Pseudo" defaultValue={user.id} onChange={(e) => _updatePseudo(e)} fullWidth/>
                        <TextField className={"input"} error={this.state.errorMdp !== null} helperText={this.state.errorMdp} type="password" margin="normal" label="Mot de passe" defaultValue={user.password} onChange={(e) => _updatePassword(e)} fullWidth/>
                        <TextField className={"input"} error={this.state.errorMdp !== null} helperText={this.state.errorMdp} type="password" margin="normal" label="Confirmation mot de passe" defaultValue={user.confPassword} onChange={(e) => _updateConfPassword(e)} fullWidth/>

                        <Button onClick={_handleSubmit} >Inscription</Button>

                        <p>En vous inscrivant, vous acceptez nos <span>Conditions générales</span>, notre <span>Politique d’utilisation des données</span> et notre <span>Politique d’utilisation des cookies</span>.</p>
                    </form>

                    <div className={"backLogin"}>
                        <p>Vous avez un compte ? <Link to={"/login"}>Connectez-vous</Link></p>
                    </div>
                </Grid>
                {this.props.variant && <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.props.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <MySnackbarContentWrapper onClose={this.handleClose} variant={this.props.variant} message={this.props.message}/>
                </Snackbar>}
            </Grid>

        );
    }
}

export default AccountForm;
