import { connect } from 'react-redux';
import {
  currentScrambleSelector,
  selectedScramblerSelector,
} from 'sessions/selectors';
import Solvers from './Solvers';

const mapStateToProps = state => ({
  currentScramble: currentScrambleSelector(state),
  scrambler: selectedScramblerSelector(state),
});

const SolversContainer = connect(mapStateToProps)(Solvers);

export default SolversContainer;
