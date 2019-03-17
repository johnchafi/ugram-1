import { connect } from 'react-redux'
import {State} from "../../reducers";
import {withRouter} from 'react-router-dom';
import Search from "../../components/Search/SearchComponent";
import {handleSearch} from "../../actions/Search/Search";
import {getPicturesDescription, getPicturesTags} from "../../selectors/Search/Search";

const mapStateToProps = (state: State) => ({
    picturesDescription : getPicturesDescription(state),
    picturesTags : getPicturesTags(state)
});

const mapDispatchToProps = {
    handleSearch: handleSearch
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Search))
