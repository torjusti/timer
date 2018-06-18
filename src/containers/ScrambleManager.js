import { connect } from 'react-redux';
import ScrambleMenu from '../components/ScrambleMenu';
import { selectScrambler } from '../actions/scrambles';

const mapStateToProps = (state) => ({
  selectedScrambler: state.selectedScrambler,
  currentScramble: state.currentScramble,
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
