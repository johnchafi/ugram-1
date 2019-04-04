import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    FormControl, Icon, Grid, Modal, DialogContent, Stepper, Step, StepLabel, Button, TextField
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import UploadModel from "../../models/Upload";
import PictureItem from "../../containers/Picture/PictureItem";


export interface Props{
    user: User,
    uploadPicture: (userId: string, file : File, model : UploadModel) => any,
    open: boolean
}
interface State {
    upload: UploadModel,
    file: File,
    fileUrl: string,
    picture : Picture,
    errorImage: string,
    loading: boolean,
    openModal: boolean,
    image: {
        width: number,
        height: number,
        rotation: number
    },
    activeStep: number,
    steps: string[],
    errorDescription: string,
}



class Upload extends React.Component<Props,State> {

    constructor(props : Props) {
        super(props);
        this.initializeState();

    }



    initializeState() {
        this.state = {
            fileUrl: "",
            errorDescription: null,
            errorImage: null,
            loading: false,
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
            },
            openModal: false,
            image: {
                width: 0,
                height: 0,
                rotation: 0,
            },
            activeStep: 0,
            steps: ["Redimensionner","Ajouter contenu","Valider"]

        }
    }




    handleUploadFile = (file) => {
        if (file.length > 0) {
            this.state.picture.url = URL.createObjectURL(file[0]);


            this.setState({
                errorImage: null,
                picture: {
                    ...this.state.picture,
                    url: URL.createObjectURL(file[0])
                },
                file: file[0],
                openModal: true
            });
        }
        else {
            this.setState({errorImage: "Merci de fournir une image"});
        }

    };



    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.open) {
            this.initializeState();

            this.setState({
                loading: false,
                openModal: false,
            });
        }
    }

    validate(picture: Picture = null) : boolean {
        let error = true;


        if (picture.description.length === 0) {
            this.setState({errorDescription: "Merci d'indiquer une description"});
            error = false;
        }
        else {
            this.setState({errorDescription: null});
        }
        return error;
    }

    onImgLoad({target:img}) {
        this.setState({
            image:{
                ...this.state.image,
                height: img.offsetHeight,
                width: img.offsetWidth,
                rotation: 0
            }
        });
    }

    handleChangeDescription = (event) => {
        this.state.picture.description = event.target.value;
        this.setState({
            upload: {
                ...this.state.upload,
                description: event.target.value
            }
        });
    };

    handleChangeMentions = (event) => {
        this.state.picture.mentions = event.target.value.replace(/\s+/g,' ').trim().split(' ');
        this.setState({
            upload: {
                ...this.state.upload,
                mentions: event.target.value.replace(/\s+/g,' ').trim().split(' ')
            }
        });
    };

    handleChangeTags = (event) => {
        this.state.picture.tags = event.target.value.replace(/\s+/g,' ').trim().split(' ')
        this.setState({
            upload: {
                ...this.state.upload,
                tags: event.target.value.replace(/\s+/g,' ').trim().split(' ')
            }
        });
    };

    handleChangeWidth = (event) => {
        const width = parseInt(event.target.value);
        this.setState({
            image: {
                ...this.state.image,
                width: width
            }
        });
        this.state.image.width = width;
        this.state.picture.width = width;
    };

    handleChangeHeight = (event) => {
        const height = parseInt(event.target.value);
        this.setState({
            image: {
                ...this.state.image,
                height: height
            }
        });
        this.state.image.height = height;
        this.state.picture.height = height;
    };

    handleChangeRotation = (event) => {
        const rotation = parseInt(event.target.value);
        if (rotation >= 0) {
            this.setState({
                image: {
                    ...this.state.image,
                    rotation: rotation
                }
            });
            this.state.image.rotation = rotation;
            this.state.picture.rotation = rotation;
            this.resizeImage();
        }

    };

    getImageStyle() {
        if (this.state.image.width >= 0 && this.state.image.height) {
            return {
                width: this.state.image.width,
                height: this.state.image.height
            }
        }
        return;
    }

    resizeImage() {
        // Resizer.imageFileResizer(
        //     this.props.file,
        //     this.state.image.width,
        //     this.state.image.height,
        //     'JPEG',
        //     100,
        //     this.state.image.rotation,
        //     uri => {
        //         this.state.picture.url = uri;
        //     },
        //     'base64'
        // );
    }

    handleUploadPicture = () => {
        this.setState({
            loading: false
        });
        this.props.uploadPicture(this.props.user.id, this.state.file, this.state.upload);
    };



    handleNext = () => {
        const { activeStep } = this.state;

        if (this.state.steps[activeStep] === "Ajouter contenu") {
            if (!this.validate(this.state.picture)) {
                return;
            }
        }
        this.setState({
            activeStep: activeStep + 1
        });

        if (activeStep === this.state.steps.length - 1) {
            this.handleUploadPicture();
        }
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };
    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
            width: "80%",
            height: "80%",
        };
    }
    handleCloseModal = () => {
    };

    getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid container direction="row" justify="center" alignItems="center">
                            <TextField type={"number"} value={this.state.image.width} label="Width" onChange={(e) => this.handleChangeWidth(e)}/>
                            <TextField type={"number"} value={this.state.image.height} label="Height" onChange={(e) => this.handleChangeHeight(e)}/>
                            <TextField type={"number"} value={this.state.image.rotation} label="Rotation" onChange={(e) => this.handleChangeRotation(e)}/>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className={"imagePreview"}>
                            <img style={this.getImageStyle()} onLoad={this.onImgLoad.bind(this)} alt={"Preview post"} src={this.state.picture.url}/>
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid container direction="row" justify="center" alignItems="center">
                            <TextField
                                autoFocus={true}
                                multiline={true}
                                placeholder="Description"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                error={this.state.errorDescription !== null}
                                helperText={this.state.errorDescription}
                                label="Description"
                                onChange={(e) => this.handleChangeDescription(e)}
                            />
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <TextField
                                multiline={true}
                                placeholder="Mentions"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                label="Mentions"
                                onChange={(e) => this.handleChangeMentions(e)}
                            />
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <TextField
                                multiline={true}
                                placeholder="Tags"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                label="Tags"
                                onChange={(e) => this.handleChangeTags(e)}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container direction="row" justify="center" alignItems="center">
                        <PictureItem user={this.props.user} picture={this.state.picture} isHome={true}/>
                    </Grid>
                );
            default:
                return ;
        }
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        const { activeStep } = this.state;

        return (
            <Grid item>
                <FormControl className={"formUpload"}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid container direction="row" justify="center" alignItems="center">
                            <label className={"uploadButton"}>
                                <p>Téléverser une image</p>
                                <Icon>cloud_upload</Icon>
                                <input type='file' onChange={(e) => this.handleUploadFile(e.target.files)} style={{ display: 'none'}}/>
                            </label>
                            {
                                this.state.errorImage &&
                                <Grid className={"error"} container direction="row" justify="center" alignItems="center">
                                    Merci de fournir une image à téléverser
                                </Grid>
                            }
                        </Grid>

                    </Grid>
                    {
                        <Modal style={this.getModalStyle()} open={this.state.openModal} onClose={this.handleCloseModal}  className={"modalUpload"}>
                            <Grid>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {this.state.steps.map((label, index) => {
                                        return (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                <div>
                                    {activeStep === this.state.steps.length ? (
                                        {
                                        }
                                    ) : (
                                        <Grid className={"stepContent"}>
                                            {this.getStepContent(activeStep)}
                                            <Grid container direction="row" justify="center" alignItems="center">
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                >
                                                    Précédent
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                >
                                                    {activeStep === this.state.steps.length - 1 ? 'Terminer' : 'Suivant'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                </div>
                            </Grid>
                        </Modal>
                    }

                </FormControl>
            </Grid>

        );
    }
}
export default (Upload);
