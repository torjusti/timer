import { connect } from 'react-redux';
import BigResult from '../components/BigResult';

const mapStateToProps = (state, ownProps) => ({
  result: state.results.find(r => ownProps.params &&
    /^\d+$/.test(ownProps.params.id) &&
    r.id === parseInt(ownProps.params.id, 10)),
});

const ResultManager = connect(
  mapStateToProps,
)(BigResult);

export default ResultManager;
