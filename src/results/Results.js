import { connect } from 'react-redux';
import ResultList from './ResultList';
import { getResults } from './selectors';
import { deleteResult, togglePlusTwo, toggleDNF }  from './actions';

const mapStateToProps = (state, ownProps) => ({
  results: getResults(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (identificators) => {
    dispatch(deleteResult(identificators));
  },

  onTogglePlusTwo: (identificators) => {
    dispatch(togglePlusTwo(identificators));
  },

  onToggleDNF: (identificators) => {
    dispatch(toggleDNF(identificators));
  }
});

const Results = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultList);

export default Results;
