import { connect } from 'react-redux';
import { getResults } from '../selectors/results';
import ResultList from '../components/ResultList';
import { deleteResult, togglePlusTwo, toggleDNF }  from '../actions/results';

const mapStateToProps = (state, ownProps) => ({
  results: getResults(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => {
    dispatch(deleteResult(id));
  },

  onTogglePlusTwo: (id) => {
    dispatch(togglePlusTwo(id));
  },

  onToggleDNF: (id) => {
    dispatch(toggleDNF(id));
  }
});

const ActiveResultList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultList);

export default ActiveResultList;
