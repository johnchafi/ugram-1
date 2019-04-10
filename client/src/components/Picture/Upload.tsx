import * as React from 'react'
import {Link} from 'react-router-dom';
import {
    FormControl, Icon, Grid, Dialog, Stepper, Step, StepLabel, Button, TextField, Typography
} from "@material-ui/core";
import Picture from "../../models/Picture";
import User from "../../models/User";
import UploadModel from "../../models/Upload";
import PictureItem from "../../containers/Picture/PictureItem";
import ProcessImage from 'react-imgpro';
import Resizer from 'react-image-file-resizer';
import * as Webcam from "react-webcam";
import Helper from "../../helper/helper";

export interface Props{
    user: User,
    uploadPicture: (userId: string, file : File, model : UploadModel) => any,
    open: boolean
}
interface State {
    upload: UploadModel,
    picture : Picture,
    errorImage: string,
    openModal: boolean,
    openModalWebcam: boolean,
    activeStep: number,
    steps: string[],
    errorDescription: string,
    imageFilter: {
        greyscale: boolean,
        invert: boolean,
        sepia: boolean,
    },
    imgTemp: string,
    imgWebcam: string,
    webcam: Webcam,
}

const initialState = {
    errorDescription: null,
    errorImage: "",
    upload: {
        description: "",
        mentions: [],
        tags: [],
    },
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
    imgTemp: "",
    imgWebcam: "",
    openModal: false,
    openModalWebcam: false,
    activeStep: 0,
    steps: ["Aperçu","Ajouter contenu","Valider"],
    imageFilter: {
        greyscale: false,
        invert: false,
        sepia: false,
    },
    webcam: null
}


class Upload extends React.Component<Props,State> {

    constructor(props : Props) {
        super(props);
        this.state = initialState;

        console.log(Webcam);
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.open) {
            this.setState(initialState);
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

    handleUploadFile = (file) => {
        if (file.length > 0) {
            this.setState({
                picture: {
                    ...this.state.picture,
                    createdDate: Date.now(),
                    file: file[0]
                },
                openModal: true,
                imgTemp: URL.createObjectURL(file[0]),
            });
        }

    };

    handleUploadPhotoWebcam = () => {
        let file : File = Helper.dataURLtoFile(this.state.imgWebcam, "test.jpg");

        this.setState({
            imgTemp : URL.createObjectURL(file),
            picture: {
                ...this.state.picture,
                createdDate: Date.now(),
                file: file
            },
            imgWebcam: "",
            openModal: true,
            openModalWebcam: false
        });

    };

    onImgLoad({target:img}) {
        if (img.offsetWidth > 600 || img.offsetHeight > 600) {
            this.setState({
                errorImage: "l'image sélectionnée a été recadrée pour respecter la taille maximale autorisée (600x600)",
            });
        }
        Resizer.imageFileResizer(
            this.state.picture.file,
            600,
            600,
            'JPEG',
            100,
            0,
            uri => {
                this.setState({
                    picture:{
                        ...this.state.picture,
                        url: uri
                    }
                });
            },
            'base64'
        );
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

    handleUploadPicture = () => {
        this.props.uploadPicture(this.props.user.id, this.state.picture.file, this.state.upload);
        this.setState({
            openModal: false
        });
        this.setState(initialState)
    };



    handleNext = () => {
        const { activeStep } = this.state;

        if (this.state.steps[activeStep] === "Ajouter contenu") {
            if (!this.validate(this.state.picture)) {
                return;
            }
            else {
                this.setState({
                    picture: {
                        ...this.state.picture,
                        url: this.state.imgTemp
                    }
                });
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
    handleCloseModal = () => {
        this.setState({
            openModal: false
        })
        this.setState(initialState)
    };
    handleCloseModalWebcam = () => {
        this.setState({
            openModalWebcam: false
        })
        this.setState(initialState)
    };

    handleChangeFilter = (src) => {
        let file : File = Helper.dataURLtoFile(src, "test.jpg");
        this.setState({
            imgTemp : URL.createObjectURL(file),
            picture: {
                ...this.state.picture,
                createdDate: Date.now(),
                file: file
            }
        });
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid container direction="row" justify="center" alignItems="center" className={"containerFilter"}>
                            <Typography>Appliquer un filtre:</Typography>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Button variant="contained" color="primary" onClick={() => { this.setState({imageFilter: {...this.state.imageFilter, sepia: false, invert: false, greyscale: false}})}}>Aucun</Button>
                                <Button variant="contained" color="primary" onClick={() => { this.setState({imageFilter: {...this.state.imageFilter, sepia: true, invert: false, greyscale: false}}) }}>Sépia</Button>
                                <Button variant="contained" color="primary" onClick={() => { this.setState({imageFilter: {...this.state.imageFilter, invert: true, greyscale: false, sepia: false}}) }}>Inversion</Button>
                                <Button variant="contained" color="primary" onClick={() => { this.setState({imageFilter: {...this.state.imageFilter, greyscale:true , invert: false,sepia: false }}) }}>Nuances de gris</Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className={"imagePreview"}>
                            {
                                this.state.picture.url != "" &&
                                <ProcessImage
                                    image={this.state.picture.url}
                                    sepia={this.state.imageFilter.sepia}
                                    greyscale={this.state.imageFilter.greyscale}
                                    invert={this.state.imageFilter.invert}

                                    processedImage={(src, err) => {
                                        this.handleChangeFilter(src);
                                    }}
                                />
                            }
                            {
                                this.state.picture.url == "" &&
                                <img onLoad={this.onImgLoad.bind(this)} src={this.state.imgTemp} alt={"Preview image"}/>
                            }
                            <Typography>{this.state.errorImage}</Typography>
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
                                defaultValue={this.state.picture.description}
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
                                defaultValue={this.state.picture.mentions.toString()}
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
                                defaultValue={this.state.picture.tags.toString()}
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
                        <PictureItem user={this.props.user} picture={this.state.picture} isHome={true} preview={true}/>
                    </Grid>
                );
            default:
                return ;
        }
    }

    handleOpenWebcam = () => {
        this.setState({
            openModalWebcam: true
        })
    };

    setRefWebcam = webcam => {
        this.setState({
            webcam: webcam
        });
    };

    render() {
        const { activeStep } = this.state;

        return (
            <Grid item>
                <FormControl className={"formUpload"}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button>
                                <label className={"uploadButton"}>
                                    <p>Téléverser une image</p>
                                    <Icon>cloud_upload</Icon>
                                    <input type='file' onChange={(e) => this.handleUploadFile(e.target.files)} style={{ display: 'none'}}/>
                                </label>
                            </Button>

                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Typography>OU</Typography>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button onClick={this.handleOpenWebcam}>
                                <label className={"uploadButton"} >
                                    <p>Utiliser sa webcam</p>
                                    <Icon>photo_camera</Icon>
                                </label>
                            </Button>

                        </Grid>
                    </Grid>
                    <Dialog maxWidth={"lg"} scroll="body" open={this.state.openModalWebcam} onClose={this.handleCloseModalWebcam}   className={"modalWebcam"}>
                        <Button className={"closeModal"} onClick={this.handleCloseModal}>
                            <img alt={"close modal"} src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png'/>
                        </Button>
                        <Grid container direction="row" justify="center" alignItems="center">
                            {
                                this.state.imgWebcam == "" &&
                                <Grid container direction="row" justify="center" alignItems="center" className={"inModalWebcam"}>
                                    <Webcam
                                        style={{
                                            margin:"50px"
                                        }}
                                        ref={this.setRefWebcam}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                    />
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Button variant="contained" color="primary" onClick={() => { this.setState({imgWebcam: this.state.webcam.getScreenshot()})}}>Prendre la photo</Button>
                                    </Grid>
                                </Grid>
                            }
                            {
                                this.state.imgWebcam != "" &&
                                <Grid container direction="row" justify="center" alignItems="center" className={"inModalWebcam"}>
                                   <img src={this.state.imgWebcam} alt={"Image preview"} className={"imgPreview"}/>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Button variant="contained" color="primary" onClick={() => { this.setState({imgWebcam: ""})}}>Revenir en arrière</Button>
                                        <Button variant="contained" color="primary" onClick={this.handleUploadPhotoWebcam}>Valider</Button>
                                    </Grid>
                                </Grid>
                            }

                        </Grid>
                    </Dialog>
                    <Dialog maxWidth={"lg"} scroll="body" open={this.state.openModal} onClose={this.handleCloseModal}  className={"modalUpload"}>
                        <Button className={"closeModal"} onClick={this.handleCloseModal}>
                            <img alt={"close modal"} src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png'/>
                        </Button>
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
                    </Dialog>
                </FormControl>
            </Grid>

        );
    }
}
export default Upload;
