import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {
    Button, createStyles, FormControl, TextField, Theme, WithStyles, withStyles
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import UploadModel from "../../models/Upload";
import PictureItem from "../../containers/Picture/PictureItem";

export interface Props extends WithStyles<typeof styles>{
    user: User,
    uploadPicture: (userId: string, file : File, model : UploadModel) => any
}
interface State {
    upload: UploadModel,
    file: File,
    fileUrl: string,
    picture : Picture
}


const styles = (theme: Theme) => createStyles({

});



class Upload extends React.Component<Props,State> {

    constructor(props : Props) {
        super(props);

        this.state = {
            fileUrl: "",
            upload: {
                description: "",
                mentions: [],
                tags: [],
            },
            file: null,
            picture: {
                createdDate: 0,
                description: "",
                file: null,
                id: 0,
                mentions: [],
                tags: [],
                url: "",
                user: {},
                userId: ""
            }

        }
    }

    handleChangeDescription = (event) => {
        this.setState({
            picture: {
                ...this.state.picture,
                description: event.target.value
            },
            upload: {
                ...this.state.upload,
                description: event.target.value
            }
        });
    };
    handleUploadFile = (file) => {
        this.state.picture.url = URL.createObjectURL(file[0]);
        console.log(this.state.picture.url);

        this.setState({
            picture: {
                ...this.state.picture,
                url: URL.createObjectURL(file[0])
            },
            file: file[0]
        });
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
                        <Grid container direction="row" justify="center" alignItems="center">
                        <TextField
                            label="Description"
                            onChange={(e) => this.handleChangeDescription(e)}
                        />
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                        <TextField
                            label="Mentions"
                            onChange={(e) => this.handleChangeDescription(e)}
                        />
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                        <TextField
                            label="Tags"
                            onChange={(e) => this.handleChangeDescription(e)}
                        />
                        </Grid>
                        <input type='file' onChange={(e) => this.handleUploadFile(e.target.files)} />
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">


                        <PictureItem user={this.props.user} picture={this.state.picture} isHome={true}/>


                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button color="primary" variant="contained" onClick={this.handleUploadPicture} >submit</Button>
                    </Grid>
                </FormControl>
            </Grid>

        );
    }
}
export default withStyles(styles)(Upload);
