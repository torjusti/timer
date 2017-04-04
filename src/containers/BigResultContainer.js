import { connect } from 'react-redux';
import { getResult } from '../selectors/results';
import BigResult from '../components/BigResult';

const mapStateToProps = (state, ownProps) => ({
  result: getResult(state, ownProps.params && ownProps.params.id),
});

const ResultManager = connect(
  mapStateToProps,
)(BigResult);

export default ResultManager;
