import * as React from 'react'
import {
    Button,
    TextField,
    Typography,
} from "@material-ui/core";
import User from "../../models/User";
import SettingIcon from '@material-ui/icons/Settings';
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import DialogContent from "@material-ui/core/DialogContent";
import FormGroup from "@material-ui/core/FormGroup";
import {Cookies} from "react-cookie";

export interface Props{
    editUser: (User) => any
    deleteUser: (userId : string) => any
    profil: User,
    cookies: Cookies
}
interface State {
    profil: User,
    open :boolean
    errorMail: string
    errorTel: string,
    errorFirstName: string,
    errorLastName: string
}



class EditProfil extends React.Component<Props,State> {

    constructor(props: Props)
    {
        super(props);
        this.state = {
            profil: this.props.profil,
            open: false,
            errorMail : null,
            errorTel : null,
            errorFirstName : null,
            errorLastName : null
        }
    }

    validate(lastName: string = null, email : string = null, firstName: string = null, tel : number = null) : number {
        let nbErrors : number = 0;

        let emailReg : RegExp =  new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}");
        let numberReg : RegExp = new RegExp("^[0-9-+s()]*$");
        if (!emailReg.test(email)) {
            this.setState({errorMail: "Email incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorMail: null});
        }
        if (!numberReg.test(tel.toString())) {
            this.setState({errorTel: "Numéro de téléphone incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorTel: null});
        }
        if (firstName.length === 0) {
            this.setState({errorFirstName: "Prénom incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorFirstName: null});
        }
        if (lastName.length === 0) {
            this.setState({errorLastName: "Nom incorrect"});
            nbErrors++;
        }
        else {
            this.setState({errorLastName: null});
        }
        return nbErrors;
    }


    handleChangeFirstName = (event) => {
        this.state.profil.firstName = event.target.value;
        this.setState({profil: this.state.profil});
        this.validate(this.state.profil.lastName, this.state.profil.email, this.state.profil.firstName, this.state.profil.phoneNumber);
    };
    handleChangeLastName = (event) => {
        this.state.profil.lastName = event.target.value;
        this.setState({profil: this.state.profil});
        this.validate(this.state.profil.lastName, this.state.profil.email, this.state.profil.firstName, this.state.profil.phoneNumber);
    };


    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.profil !== this.props.profil)
            this.setState({profil: nextProps.profil});
    }

    handleChangeEmail = (event) => {
        this.state.profil.email = event.target.value;
        this.setState({profil: this.state.profil});
        this.validate(this.state.profil.lastName, this.state.profil.email, this.state.profil.firstName, this.state.profil.phoneNumber);
    };

    handleChangePhoneNumber = (event) => {
        this.state.profil.phoneNumber = event.target.value;
        this.setState({profil: this.state.profil});
        this.validate(this.state.profil.lastName, this.state.profil.email, this.state.profil.firstName, this.state.profil.phoneNumber);
    };
    handleChangeProfil = (event) => {
       let errors = this.validate(this.state.profil.lastName, this.state.profil.email, this.state.profil.firstName, this.state.profil.phoneNumber);

        if (errors === 0) {
            this.props.editUser(this.state.profil);
            this.setState({open: false});
        }
    };
    close = (event) => {
        this.setState({open: false})
    };

    handleEditingProfil = () : void => {
        this.setState({open: true})
    };

    deleteProfil = () : void => {
        this.props.cookies.remove('token');
        this.props.cookies.remove('userid');
        this.props.deleteUser(this.props.profil.id);
    };


    render() {
        return (
            <div>
                <IconButton  style={{marginLeft: 10 }} onClick={this.handleEditingProfil}   disableRipple>
                    <SettingIcon/>
                </IconButton>
                <Dialog fullScreen open={this.state.open} onClose={this.close}>
                    <AppBar position="relative" color="default" elevation={0}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.close} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex:1}}>
                                Mon profil
                            </Typography>
                            <Button variant="outlined" onClick={this.handleChangeProfil} >Sauvegarder
                            </Button>
                            <Button variant="outlined" onClick={this.deleteProfil} >Supprimer mon profil
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <FormGroup row>
                            <TextField  error={this.state.errorFirstName !== null} helperText={this.state.errorFirstName} margin="dense" label="Prénom" defaultValue={this.state.profil.firstName} onChange={(e) => this.handleChangeFirstName(e)} fullWidth/>
                            <TextField  error={this.state.errorLastName !== null} helperText={this.state.errorLastName} margin="dense" label="Nom" defaultValue={this.state.profil.lastName} onChange={(e) => this.handleChangeLastName(e)} fullWidth/>
                            <TextField  error={this.state.errorMail !== null} helperText={this.state.errorMail} margin="dense" label="Email" type="email" defaultValue={this.state.profil.email} onChange={(e) => this.handleChangeEmail(e)} fullWidth/>
                            <TextField  error={this.state.errorTel !== null} helperText={this.state.errorTel} margin="dense" label="Téléphone" type="tel" defaultValue={this.state.profil.phoneNumber} onChange={(e) => this.handleChangePhoneNumber(e)} fullWidth/>
                        </FormGroup>
                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}
export default (EditProfil);
