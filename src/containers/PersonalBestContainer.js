import { connect } from 'react-redux';
import { newRecord } from '../actions/statistics';
import { statisticsSelector } from '../selectors/statistics';
import PersonalBest from '../components/PersonalBest';

const mapStateToProps = state => ({
  statistics: statisticsSelector(state),
  visible: state.recordMessageIsVisible,
});

const mapDispatchToProps = dispatch => ({
  handleRecord: records => {
    dispatch(newRecord(records));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalBest);