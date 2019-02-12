import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {
    Button, createStyles, FormControl, TextField, Theme, WithStyles, withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import UploadModel from "../../models/Upload";

export interface Props extends WithStyles<typeof styles>{
    user: User,
    uploadPicture: (userId: string, file : File, model : UploadModel) => any
}
interface State {
    upload: UploadModel,
    file: File
}


const styles = (theme: Theme) => createStyles({

});



class Upload extends React.Component<Props,State> {

    constructor(props : Props)
    {
        super(props);

        this.state = {
            upload: {
                description:"",
                mentions:[],
                tags:[],
            },
            file: null
        }
    }

    handleChangeDescription = (event) => {
        this.state.upload.description = event.target.value;
        this.setState({upload: this.state.upload});
    };
    handleUploadFile = (file) => {
        this.setState({file: file[0]});
    };
    handleUploadPicture = () => {
        this.props.uploadPicture(this.props.user.id, this.state.file, this.state.upload);
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    }

    render() {
        return (
            <Grid item>
                <FormControl>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid container item xs={3}>
                            <TextField
                                id="standard-name"
                                label="Description"
                                onChange={(e) => this.handleChangeDescription(e)}
                                margin="normal"
                            />
                            <input type='file' onChange={(e) => this.handleUploadFile(e.target.files)} />
                        </Grid>
                        <Grid container item xs={3}>
                            <Button color="primary" variant="contained" onClick={this.handleUploadPicture} >submit</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>

        );
    }
}
export default withStyles(styles)(Upload);
