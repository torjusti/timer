export const NEW_RECORD = 'NEW_RECORD';
export const SHOW_RECORD_MESSAGE = 'SHOW_RECORD_MESSAGE';
export const HIDE_RECORD_MESSAGE = 'HIDE_RECORD_MESSAGE';

/**
 * Used by the statistics saga to start the process
 * which shows the message and hides it some time later.
 */
export const newRecord = records => ({
  type: NEW_RECORD,
  records,
});

/**
 * Displays the record message.
 */
export const showRecordMessage = records => ({
  type: SHOW_RECORD_MESSAGE,
  records,
});

/**
 * Hides the record message.
 */
export const hideRecordMessage = () => ({
  type: HIDE_RECORD_MESSAGE,
});
