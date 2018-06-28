import { connect } from 'react-redux';
import ExportDataButton from './ExportDataButton';

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(
  mapStateToProps,
)(ExportDataButton);
