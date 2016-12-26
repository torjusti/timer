import { connect } from 'react-redux';
import SessionMenu from '../components/SessionMenu';
import { setSession, createSession } from '../actions';

const mapStateToProps = (state) => (state) => ({
  sessions: state.sessions,
  selectedSession: state.selectedSession,
});

const mapDispatchToProps = (dispatch) => ({
  onSessionChange: (id) => {
    dispatch(setSession(id));
  },

  onSessionCreate: (name) => {
    dispatch(createSession(name));
  },
});

const SessionManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionMenu);

export default SessionManager;
