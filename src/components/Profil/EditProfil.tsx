import * as React from 'react'
import {Button, createStyles, FormControl, Grid, Modal, TextField, Theme, Typography, WithStyles, withStyles} from "@material-ui/core";
import User from "../../models/User";
import SettingIcon from '@material-ui/icons/Settings';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = (theme: Theme) => createStyles({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});


export interface Props extends WithStyles<typeof styles>{
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
                <Button onClick={this.handleEditingProfil} variant="outlined"   disableRipple>
                    Modifier le profil
                    <SettingIcon/>
                </Button>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.close}>
                    <div style={getModalStyle()} className={this.props.classes.paper}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Typography variant="h6" id="modal-title">
                                Modifier le profil
                            </Typography>
                            <Grid xs={12} item>
                                <FormControl>
                                    <TextField  margin="normal" label="Prénom" defaultValue={this.state.profil.firstName} onChange={(e) => this.handleChangeFirstName(e)}> </TextField>
                                    <TextField  margin="normal" label="Nom" defaultValue={this.state.profil.lastName} onChange={(e) => this.handleChangeLastName(e)}> </TextField>
                                    <TextField  margin="normal" label="Email" defaultValue={this.state.profil.email} onChange={(e) => this.handleChangeEmail(e)}> </TextField>
                                    <TextField  margin="normal" label="Téléphone" defaultValue={this.state.profil.phoneNumber} onChange={(e) => this.handleChangePhoneNumber(e)}> </TextField>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid container item xs={12}>
                                            <Button color="primary" variant="contained" onClick={this.handleChangeProfil} >Sauvegarder
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default withStyles(styles)(EditProfil);
