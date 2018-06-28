import { connect } from 'react-redux';
import { getResult } from './selectors';
import ResultPage from './ResultPage';

const mapStateToProps = (state, ownProps) => ({
  result: getResult(state, ownProps.match.params.id),
});

const ConnectedResultPage = connect(
  mapStateToProps,
)(ResultPage);

export default ConnectedResultPage;
