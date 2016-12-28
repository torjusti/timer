import { connect } from 'react-redux';
import ResultList from '../components/ResultList';
import { deleteResult, togglePlusTwo, toggleDNF }  from '../actions/results';

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results.filter((result) => result.session === state.selectedSession),
  };
}

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
