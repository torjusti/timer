import { connect } from 'react-redux';
import Statistics from '../components/Statistics';

const mapStateToProps = (state) => ({
  results: state.results,
});

const StatisticsContainer = connect(mapStateToProps)(Statistics);

export default StatisticsContainer;
