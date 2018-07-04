import { connect } from 'react-redux';
import { newRecord } from './actions';
import { statisticsSelector } from 'statistics/selectors';
import { selectedScramblerSelector } from 'sessions/selectors';
import RecordToast from './RecordToast';

const mapStateToProps = state => ({
  disabled: selectedScramblerSelector(state) === 'algs',
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
)(RecordToast);
