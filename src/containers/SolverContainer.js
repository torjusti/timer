import { connect } from 'react-redux';
import EOLineSolver from '../components/EOLineSolver';

const mapStateToProps = (state) => ({
  currentScramble: state.currentScramble,
});

const SolverContainer =  connect(
  mapStateToProps,
)(EOLineSolver);

export default SolverContainer;
