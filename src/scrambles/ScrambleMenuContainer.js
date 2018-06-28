import { connect } from 'react-redux';
import { selectScrambler } from './actions';
import { selectedScramblerSelector, currentScrambleSelector } from 'sessions/selectors';
import ScrambleMenu from './ScrambleMenu';

const mapStateToProps = (state) => ({
  selectedScrambler: selectedScramblerSelector(state),
  currentScramble: currentScrambleSelector(state),
  currentAlgorithm: state.currentAlgorithm,
});

const mapDispatchToProps = (dispatch) => ({
  onScramblerChange: (updatedScrambler) => {
    dispatch(selectScrambler(updatedScrambler));
  },
});

const ScrambleManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScrambleMenu);

export default ScrambleManager;