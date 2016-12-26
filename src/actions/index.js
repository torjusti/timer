let nextResultId = 0;

export const addResult = (session, time) => ({
  type: 'ADD_RESULT',
  id: nextResultId++,
  session,
  time,
});

export const deleteResult = (session, id)  => ({
  type: 'DELETE_RESULT',
  session,
  id,
});

export const setSession = (id) => ({
  type: 'SET_SESSION',
  id,
});

let nextSessionId = 0;

export const createSession = (name) => ({
  type: 'CREATE_SESSION',
  id: nextSessionId++,
  name,
});

export const deleteSession = (id) => ({
  type: 'DELETE_SESSION',
  id,
});

export const clearSession = (id) => ({
  type: 'CLEAR_SESSION',
  id,
});

export const renameSession =  (id, name) => ({
  type: 'RENAME_SESSION',
  id,
  name,
});
