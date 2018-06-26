import { connect } from 'react-redux';
import { getResults } from 'selectors/results';
import Statistics from 'components/Statistics';
import { statisticsSelector } from 'selectors/statistics';

const mapStateToProps = (state) => ({
  resultCount: getResults(state).length,
  statistics: statisticsSelector(state),
});

const StatisticsContainer = connect(
  mapStateToProps,
)(Statistics);

export default StatisticsContainer;
