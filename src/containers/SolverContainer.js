import { connect } from 'react-redux';
import Solvers from '../components/Solvers';
import { currentScrambleSelector } from '../selectors/sessions';

const mapStateToProps = (state) => ({
  currentScramble: currentScrambleSelector(state),
  scrambler: state.selectedScrambler,
});

const SolverContainer =  connect(
  mapStateToProps,
)(Solvers);

export default SolverContainer;
