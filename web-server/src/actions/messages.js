/* eslint-disable import/prefer-default-export */
import * as Actions from '../constants/action-types';
import * as wsock from '../utils/ws';

export const appendMessage = message => ({
  type: Actions.APPEND_MESSAGE,
  payload: message,
});

export const sendMessage = message => {
  // Don't do this in production code
  // Epic to rescue!
  wsock.chat(message);
  return appendMessage(message);
};
