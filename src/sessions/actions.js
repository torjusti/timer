import uuid from 'uuid/v4';

export const CREATE_SESSION = 'CREATE_SESSION';
export const SET_SESSION = 'SET_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';
export const CLEAR_SESSION = 'CLEAR_SESSION';
export const RENAME_SESSION = 'RENAME_SESSION';
export const TOGGLE_SESSIONS_DIALOG = 'TOGGLE_SESSIONS_DIALOG';

/**
 * Create a new session with the given name.
 */
export const createSession = name => ({
  type: CREATE_SESSION,
  id: uuid(),
  name,
});

/**
 * Update the selected session to be the session with the given ID.
 */
export const setSession = id => ({
  type: SET_SESSION,
  id,
});

/**
 * Delete the session with the given ID.
 */
export const deleteSession = id => ({
  type: DELETE_SESSION,
  id,
});

/**
 * Remove all results from the session with the given ID.
 */
export const clearSession = id => ({
  type: CLEAR_SESSION,
  id,
});

/**
 * Rename the session with the given ID.
 */
export const renameSession = (id, name) => ({
  type: RENAME_SESSION,
  id,
  name,
});

/**
 * Set the visibility of the settings selection dialog.
 */
export const toggleSessionsDialog = visible => ({
  type: TOGGLE_SESSIONS_DIALOG,
  visible,
});
