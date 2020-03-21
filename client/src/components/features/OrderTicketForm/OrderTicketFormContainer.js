import { connect } from 'react-redux';
import { addSeatRequest, getRequests, loadSeats } from '../../../redux/seatsRedux';
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
  loadSeats: () => dispatch(loadSeats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);