import * as React from 'react'
import {Avatar, Grid, Hidden, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from '@material-ui/icons/Search';
import Picture from "../../models/Picture";
import {Link} from 'react-router-dom';


export interface Props{
    handleSearch: (search : string) => any,
    picturesDescription : Picture[],
    picturesTags : Picture[]
}
interface State {
    typingTimeout: number,
    descriptions: Picture[],
    picturesTags: Picture[]
}



class SearchComponent extends React.Component<Props,State> {
private
    constructor(props: Props)
    {
        super(props);
        this.state = {
            typingTimeout: 0,
            descriptions: null,
            picturesTags: null
        }
    }


    handleChange = (searchString : string) : void => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            typingTimeout: window.setTimeout(function () {
                if (searchString != "") {
                    this.props.handleSearch(searchString);
                }
                else {
                    this.setState({
                            descriptions: null,
                        picturesTags: null
                        }
                    );
                }
            }.bind(this), 1500)
        });

    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        console.log(nextProps);
        if (nextProps.picturesDescription !== this.props.picturesDescription) {
            this.setState({
                    descriptions: nextProps.picturesDescription
                }
            );
        }
        if (nextProps.picturesTags !== this.props.picturesTags) {
            this.setState({
                picturesTags: nextProps.picturesTags
                }
            );
        }
    }

    handleClose = (event, reason) : void => {
        if (reason === "clickaway") {
            this.setState({
                descriptions: null,
                picturesTags: null
            })
        }

    };



    static displaySearchDescriptionElement(item) {
     return (
         <Link to={`/profil/${item.userId}`}>
             <Grid className={"description"} key={item.id}>
                 <div className={"searchLeft"}>
                     <Avatar  className="avatar-home-picture" aria-label="Description" >D</Avatar>
                 </div>
                 <div className={"searchRight"}>
                     <p>{item.userId}<br /><span>{item.description}</span></p>
                 </div>

             </Grid>
         </Link>
     )
    }

    static displaySearchTagElement(item : string, i : number) {
        return <li key={i}>{item}</li>
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }

        this.handleClick();
    }

    handleClick() {
        if (!this.state.descriptions && !this.state.picturesTags) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
    }


    render() {

        return (

            <Grid item xs className={"searchbar"} ref={node => { this.node = node; }}>

                <TextField
                    variant="outlined"
                    placeholder="Rechercher"
                    onChange={(e) => this.handleChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"  className={"searchInput"}>
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />

                {
                    (this.state.descriptions || this.state.picturesTags) &&
                    <Grid className={"resultat"}>
                        <Grid>
                            {
                                this.state.descriptions.map((item, key) =>
                                    SearchComponent.displaySearchDescriptionElement(item)
                                )
                            }
                            {
                                <TextField>Tags:</TextField> &&
                                this.state.picturesTags.map((item, key) =>
                                    item.tags.map((tag, i) =>
                                        SearchComponent.displaySearchTagElement(tag, i)
                                    )
                                )
                            }
                        </Grid>
                    </Grid>
                }

            </Grid>
        );
    }
}
export default (SearchComponent);
