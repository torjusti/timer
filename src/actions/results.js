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
