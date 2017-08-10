import { connect } from 'react-redux';
import { getResults } from '../selectors/results';
import ResultList from '../components/ResultList';
import { deleteResult, togglePlusTwo, toggleDNF }  from '../actions/results';

const mapStateToProps = (state, ownProps) => ({
  results: getResults(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (ids) => {
    dispatch(deleteResult(ids));
  },

  onTogglePlusTwo: (ids) => {
    dispatch(togglePlusTwo(ids));
  },

  onToggleDNF: (ids) => {
    dispatch(toggleDNF(ids));
  }
});

const ActiveResultList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultList);

export default ActiveResultList;
