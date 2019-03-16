import * as React from 'react'
import {Grid, Hidden, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from '@material-ui/icons/Search';
import {handleSearch} from "../../actions/Search/Search";

export interface Props{
    handleSearch: (search : string) => any
}
interface State {
    typingTimeout: number
}



class SearchComponent extends React.Component<Props,State> {

    constructor(props: Props)
    {
        super(props);
        this.state = {
            typingTimeout: 0
        }
    }


    handleChange = (searchString : string) : void => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            typingTimeout: window.setTimeout(function () {
                handleSearch(searchString);
            }, 1500)
        });

    };



    render() {
        return (
            <Grid item xs className={"searchbar"}>

                <TextField
                    variant="outlined"
                    placeholder="Rechercher"
                    onChange={(e) => this.handleChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <Grid className={"resultat"}>
                </Grid>
            </Grid>
        );
    }
}
export default (SearchComponent);
