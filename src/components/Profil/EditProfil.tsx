import * as React from 'react'
import {
    Button,
    createStyles,
    Divider,
    FormControl,
    Grid, Icon,
    Modal,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles
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

export interface Props{
    editUser: (User) => any
    profil: User
}
interface State {
    profil: User,
    open :boolean
}



class EditProfil extends React.Component<Props,State> {

    constructor(props: Props)
    {
        super(props);
        this.state = {
            profil: this.props.profil,
            open: false
        }
    }

    handleChangeFirstName = (event) => {
        this.state.profil.firstName = event.target.value;
        this.setState({profil: this.state.profil});
    };
    handleChangeLastName = (event) => {
        this.state.profil.lastName = event.target.value;
        this.setState({profil: this.state.profil});
    };


    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.profil !== this.props.profil)
            this.setState({profil: nextProps.profil});
    }

    handleChangeEmail = (event) => {
        this.state.profil.email = event.target.value;
        this.setState({profil: this.state.profil});
    };

    handleChangePhoneNumber = (event) => {
        this.state.profil.phoneNumber = event.target.value;
        this.setState({profil: this.state.profil});
    };
    handleChangeProfil = (event) => {
        this.setState({open: false});
        this.props.editUser(this.state.profil);
    };
    close = (event) => {
        this.setState({open: false})
    };

    handleEditingProfil = () : void => {
        this.setState({open: true})
    };


    render() {
        return (
            <div>
                <Button style={{marginLeft: 10 }} onClick={this.handleEditingProfil} variant="outlined"   disableRipple>
                    Modifier le profil
                    <SettingIcon/>
                </Button>
                <Dialog fullScreen open={this.state.open} onClose={this.close}>
                    <AppBar position="relative" color="default" elevation={0}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.close} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex:1}}>
                                Mon profil
                            </Typography>
                            <Button color="primary" variant="contained" onClick={this.handleChangeProfil} >Sauvegarder
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <FormGroup row>
                            <TextField  margin="dense" label="Prénom" defaultValue={this.state.profil.firstName} onChange={(e) => this.handleChangeFirstName(e)} fullWidth/>
                            <TextField  margin="dense" label="Nom" defaultValue={this.state.profil.lastName} onChange={(e) => this.handleChangeLastName(e)} fullWidth/>
                            <TextField  margin="dense" label="Email" type="email" defaultValue={this.state.profil.email} onChange={(e) => this.handleChangeEmail(e)} fullWidth/>
                            <TextField  margin="dense" label="Téléphone" type="tel" defaultValue={this.state.profil.phoneNumber} onChange={(e) => this.handleChangePhoneNumber(e)} fullWidth/>
                        </FormGroup>
                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}
export default (EditProfil);
