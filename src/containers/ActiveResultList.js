import { connect } from 'react-redux';
import ResultList from '../components/ResultList';

const mapStateToProps = (state, ownProps) => {
  return state;
}

const ActiveResultList = connect(
  mapStateToProps,
)(ResultList);

export default ActiveResultList;
