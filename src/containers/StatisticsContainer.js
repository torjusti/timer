import { connect } from 'react-redux';
import { getResults } from '../selectors/results';
import Statistics from '../components/Statistics';

const mapStateToProps = (state) => ({
  results: getResults(state),
});

const StatisticsContainer = connect(mapStateToProps)(Statistics);

export default StatisticsContainer;
