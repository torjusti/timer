import { connect } from 'react-redux';
import Timer from '../components/Timer';
import { addResult } from '../actions/results';
import { gradeAlgorithm } from '../actions/sets';

const mapStateToProps = (state) => ({
  selectedSession: state.selectedSession,
  // We need the selected scrambler as we wish to generate the new scramble
  // outside the reducer when a new scramble is required.
  selectedScrambler: state.selectedScrambler,
  currentAlgorithm: state.currentAlgorithm,
  currentScramble: state.currentScramble,
});

const mapDispatchToProps = (dispatch) => ({
  onAttemptFinished: (time, selectedScrambler) => {
    dispatch(addResult(time, selectedScrambler));
  },

  grade: (id, level) => {
    dispatch(gradeAlgorithm(id, level));
  },
});

const ResultManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);

export default ResultManager;
