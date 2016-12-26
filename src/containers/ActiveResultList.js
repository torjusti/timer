import { connect } from 'react-redux';
import ResultList from '../components/ResultList';

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results.filter((result) => result.session === state.selectedSession),
  };
}

const ActiveResultList = connect(
  mapStateToProps,
)(ResultList);

export default ActiveResultList;
