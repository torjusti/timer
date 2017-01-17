import { connect } from 'react-redux';
import ScrambleMenu from '../components/ScrambleMenu';
import { selectScrambler } from '../actions/scrambles';

const mapStateToProps = (state) => ({
  currentScramble: state.currentScramble,
  selectedScrambler: state.selectedScrambler,
});

const mapDispatchToProps = (dispatch) => ({
  onScramblerChange: (updatedScrambler) => {
    dispatch(selectScrambler(updatedScrambler));
  },
});

const ScrambleManager =  connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScrambleMenu);

export default ScrambleManager;
