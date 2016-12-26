import { connect } from 'react-redux';
import Timer from '../components/Timer';
import { addResult } from '../actions/results';

const mapStateToProps = (state) => ({
  selectedSession: state.selectedSession,
});

const mapDispatchToProps = (dispatch) => ({
  onAttemptFinished: (session, time) => {
    dispatch(addResult(session, time));
  },
});

const ResultManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);

export default ResultManager;
