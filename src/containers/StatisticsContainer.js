import { connect } from 'react-redux';
import Statistics from '../components/Statistics';

const mapStateToProps = (state) => ({
  results: state.results.filter((result) => result.session === state.selectedSession),
});

const StatisticsContainer = connect(mapStateToProps)(Statistics);

export default StatisticsContainer;
