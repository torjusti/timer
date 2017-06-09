import { connect } from 'react-redux';
import Solvers from '../components/Solvers';

const mapStateToProps = (state) => ({
  currentScramble: state.currentScramble,
  scrambler: state.selectedScrambler,
});

const SolverContainer =  connect(
  mapStateToProps,
)(Solvers);

export default SolverContainer;
