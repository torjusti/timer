import { connect } from 'react-redux';
import { getResults } from 'results/selectors';
import StatisticsList from './StatisticsList';
import { statisticsSelector } from './selectors';

const mapStateToProps = state => ({
  resultCount: getResults(state).length,
  statistics: statisticsSelector(state),
});

const StatisticsContainer = connect(mapStateToProps)(StatisticsList);

export default StatisticsContainer;
