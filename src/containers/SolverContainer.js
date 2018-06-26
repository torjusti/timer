import { connect } from 'react-redux';
import Solvers from 'components/Solvers';
import { currentScrambleSelector, selectedScramblerSelector } from 'selectors/sessions';

const mapStateToProps = (state) => ({
  currentScramble: currentScrambleSelector(state),
  scrambler: selectedScramblerSelector(state),
});

const SolverContainer =  connect(
  mapStateToProps,
)(Solvers);

export default SolverContainer;
