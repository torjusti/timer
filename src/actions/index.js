let nextResultId = 0;

export const addResult = (time) => ({
  type: 'ADD_RESULT',
  id: nextResultId++,
  time: time,
});
