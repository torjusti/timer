import { connect } from 'react-redux';
import Timer from '../components/Timer';
import { addResult } from '../actions/results';
import { gradeAlgorithm } from '../actions/sets';
import { getAlgorithm } from '../selectors/sets';
import { getRemaindingAlgorithms } from '../utils/spacedRepetition';
import { selectedScramblerSelector, currentScrambleSelector } from '../selectors/sessions';

const mapStateToProps = (state) => ({
  // The currently selected session, which the results will be stored in.
  selectedSession: state.selectedSession,

  // We need the selected scrambler as we wish to generate the new scramble
  // outside the reducer when a new scramble is required.
  selectedScrambler: selectedScramblerSelector(state),

  // The ID of the algorithm currently being learned using spaced repetition.
  currentAlgorithm: state.currentAlgorithm,

  // The solution string to thte algorithm currently being learned using spaced repetition.
  // This is used to display the solution string so that the user can check for correctness.
  currentAlgorithmSolution: state.currentAlgorithm && getAlgorithm(state, state.currentAlgorithm).algorithm,

  // The remainding number of algortihms to learn.
  remaindingAlgorithmCount: getRemaindingAlgorithms().length,
  
  // The scranble currently being shown to the user.
  currentScramble: currentScrambleSelector(state),
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
