import { connect} from 'react-redux';
import Prices from './PricesPage';
import { getRequest, getConcerts, loadConcertsRequest } from '../../../redux/concertsRedux';

const mapStateToProps = state => ({
    concerts: getConcerts(state),
    requests: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
    loadConcerts: () => dispatch(loadConcertsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prices);