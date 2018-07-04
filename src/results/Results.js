import { connect } from 'react-redux';
import ResultList from './ResultList';
import { getResults } from './selectors';
import { deleteResult, setPenalty, Penalties } from './actions';

const mapStateToProps = (state, ownProps) => ({
  results: getResults(state),
});

const mapDispatchToProps = dispatch => ({
  handleDelete: identificators => {
    dispatch(deleteResult(identificators));
  },

  handleSetDNF: id => {
    dispatch(setPenalty(id, Penalties.DNF));
  },

  handleSetPlusTwo: id => {
    dispatch(setPenalty(id, Penalties.PLUS_TWO));
  },

  handleClearPenalty: id => {
    dispatch(setPenalty(id, Penalties.NONE));
  },
});

const Results = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultList);

export default Results;
