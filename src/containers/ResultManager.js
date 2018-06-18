import { connect } from 'react-redux';
import Timer from '../components/Timer';
import { addResult } from '../actions/results';
import { gradeAlgorithm } from '../actions/sets';
import { getAlgorithm } from '../selectors/sets';
import { getRemaindingAlgorithms } from '../utils/spacedRepetition';

const mapStateToProps = (state) => ({
  // The currently selected session, which the results will be stored in.
  selectedSession: state.selectedSession,

  // We need the selected scrambler as we wish to generate the new scramble
  // outside the reducer when a new scramble is required.
  selectedScrambler: state.selectedScrambler,

  // The ID of the algorithm currently being learned using spaced repetition.
  currentAlgorithm: state.currentAlgorithm,

  // The solution string to thte algorithm currently being learned using spaced repetition.
  // This is used to display the solution string so that the user can check for correctness.
  currentAlgorithmSolution: getAlgorithm(state, state.currentAlgorithm).algorithm,

  remaindingAlgorithmCount: getRemaindingAlgorithms().length,
  
  // The scranble currently being shown to the user.
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
