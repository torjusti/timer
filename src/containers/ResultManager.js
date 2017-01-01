import { connect } from 'react-redux';
import Timer from '../components/Timer';
import { addResult } from '../actions/results';

const mapStateToProps = (state) => ({
  selectedSession: state.selectedSession,
  selectedScrambler: state.selectedScrambler,
});

const mapDispatchToProps = (dispatch) => ({
  onAttemptFinished: (session, time, selectedScrambler) => {
    dispatch(addResult(session, time, selectedScrambler));
  },
});

const ResultManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);

export default ResultManager;
