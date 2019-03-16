import { connect } from 'react-redux'
import {State} from "../../reducers";
import {withRouter} from 'react-router-dom';
import Search from "../../components/Search/SearchComponent";
import {handleSearch} from "../../actions/Search/Search";

const mapStateToProps = (state: State) => ({
});

const mapDispatchToProps = {
    handleSearch: handleSearch
};

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Search))
