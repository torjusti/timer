import { connect } from 'react-redux';
import ResultList from '../components/ResultList';
import { deleteResult, togglePlusTwo }  from '../actions/results';

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results.filter((result) => result.session === state.selectedSession),
  };
}

const mapDispatchToProps =  (dispatch) => ({
  onDelete: (id) => {
    dispatch(deleteResult(id));
  },

  onTogglePlusTwo: (session, id) => {
    dispatch(togglePlusTwo(session, id));
  },
});

const ActiveResultList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultList);

export default ActiveResultList;
