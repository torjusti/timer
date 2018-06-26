import { connect } from 'react-redux';
import ScrambleMenu from 'components/ScrambleMenu';
import { selectScrambler } from 'actions/scrambles';
import { selectedScramblerSelector, currentScrambleSelector } from 'selectors/sessions';

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
