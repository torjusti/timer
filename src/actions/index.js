let nextResultId = 0;

export const addResult = (session, time) => ({
  type: 'ADD_RESULT',
  id: nextResultId++,
  session,
  time,
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
