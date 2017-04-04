import { connect } from 'react-redux';
import { getResults } from '../selectors/results';
import ResultList from '../components/ResultList';
import { deleteResult, togglePlusTwo, toggleDNF }  from '../actions/results';

const mapStateToProps = (state, ownProps) => ({
  results: getResults(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (session, id) => {
    dispatch(deleteResult(session, id));
  },

  onTogglePlusTwo: (session, id) => {
    dispatch(togglePlusTwo(session, id));
  },

  onToggleDNF: (session, id) => {
    dispatch(toggleDNF(session, id));
  }
});

const ActiveResultList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultList);

export default ActiveResultList;
