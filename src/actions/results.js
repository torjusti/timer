let nextResultId = 0;

export const addResult = (session, time) => ({
  type: 'ADD_RESULT',
  id: nextResultId++,
  session,
  time,
});

export const togglePlusTwo =  (session, id) => ({
  type: 'TOGGLE_PLUS_TWO',
  session,
  id,
});

export const deleteResult = (session, id)  => ({
  type: 'DELETE_RESULT',
  session,
  id,
});

export const toggleDNF = (session, id) => ({
  type: 'TOGGLE_DNF',
  session,
  id,
});
