/**
 * Create a new session with the given name.
 */
export const createSession = (name) => ({
  type: 'CREATE_SESSION',
  id: Date.now(),
  name,
});

/**
 * Update the selected session to be the session with the given ID.
 */
export const setSession = (id) => ({
  type: 'SET_SESSION',
  id,
});

/**
 * Delete the session with the given ID.
 */
export const deleteSession = (id) => ({
  type: 'DELETE_SESSION',
  id,
});

/**
 * Remove all results from the session with the given ID.
 */
export const clearSession = (id) => ({
  type: 'CLEAR_SESSION',
  id,
});

/**
 * Rename the session with the given ID.
 */
export const renameSession =  (id, name) => ({
  type: 'RENAME_SESSION',
  id,
  name,
});
