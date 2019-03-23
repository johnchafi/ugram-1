import * as React from 'react'
import {Avatar, Grid, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from '@material-ui/icons/Search';
import Picture from "../../models/Picture";
import {Link} from 'react-router-dom';
import User from "../../models/User";


export interface Props{
    handleSearch: (search : string) => any,
    picturesDescription : Picture[],
    picturesTags : Picture[],
    users : User[]
}
interface State {
    typingTimeout: number,
    descriptions: Picture[],
    picturesTags: Picture[],
    searchString: string,
    users : User[]
}



class SearchComponent extends React.Component<Props,State> {

    constructor(props: Props)
    {
        super(props);
        this.state = {
            searchString: "",
            typingTimeout: 0,
            descriptions: null,
            picturesTags: null,
            users: null
        }
    }


    handleChange = (SearchString : string) : void => {
        this.setState({
            searchString: SearchString
        });

        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            typingTimeout: window.setTimeout(function () {
                if (this.state.searchString != "") {
                    this.props.handleSearch(this.state.searchString);
                }
                else {
                    this.setState({
                        descriptions: null,
                        picturesTags: null,
                        users: null
                        }
                    );
                }
            }.bind(this), 1500)
        });

    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
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
        if (nextProps.users !== this.props.users) {
            this.setState({
                    users: nextProps.users
                }
            );
        }
    }

    closeResultat = () : void => {
        this.setState({
                descriptions: null,
                picturesTags: null,
                users: null,
                searchString: ""
            }
        );
    };
    displaySearchDescriptionElement(item, index) {
        return (
         <Link to={`/profil/${item.userId}?search=${item.id}`} key={index} onClick={this.closeResultat}>
             <Grid className={"description"} >
                 <div className={"searchLeft"}>
                     <Avatar  className="avatar-home-picture" aria-label="Description">D</Avatar>
                 </div>
                 <div className={"searchRight"}>
                     <p>{item.userId}<br />
                     <span>
                         {item.description}
                     </span>
                     </p>
                 </div>

             </Grid>
         </Link>
     )
    }



    displaySearchUserElement(item : User, index) {
        return (
            <Link to={`/profil/${item.id}`} key={index} onClick={this.closeResultat}>
                <Grid className={"description"} >
                    <div className={"searchLeft"}>
                        <Avatar  className="avatar-home-picture" aria-label="Description" src={item.pictureUrl}/>
                    </div>
                    <div className={"searchRight"}>
                        <p>{item.id}<br />
                            <span>{`${item.firstName} ${item.lastName}`}</span></p>
                    </div>
                </Grid>
            </Link>
        )
    }

    displaySearchTagElement(picture : Picture, index : number, search : string) {
        return (
            <Link to={`/profil/${picture.userId}?search=${picture.id}`} key={index} onClick={this.closeResultat}>
                <Grid className={"description"} >
                    <div className={"searchLeft"}>
                        <Avatar  className="avatar-home-picture" aria-label="Description">#</Avatar>
                    </div>
                    <div className={"searchRight"}>
                        <p>{picture.userId}<br />
                            {
                                picture.tags.map((item : string, i) => {
                                    if (item.includes(search)) {
                                        return ( <span className={"bold"} key={i}>#{item} </span>);
                                    }
                                    else {
                                        return ( <span key={i}>#{item} </span>);
                                    }
                                })

                            }
                        </p>
                    </div>

                </Grid>
            </Link>
        )
    }


    render() {

        return (

            <Grid item xs className={"searchbar"}>

                <TextField
                    value={this.state.searchString}
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
                                this.state.descriptions.map((item, index) =>
                                    this.displaySearchDescriptionElement(item, index)
                                )
                            }
                            {
                                this.state.picturesTags.map((item, i) =>
                                    this.displaySearchTagElement(item, i, this.state.searchString)
                                )
                            }
                            {
                                this.state.users.map((item, i) =>
                                    this.displaySearchUserElement(item, i)
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
