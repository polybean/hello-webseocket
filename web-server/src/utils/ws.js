/* eslint-disable import/prefer-default-export */
import wsock from 'websocket-stream';
import through from 'through2';
import * as _ from 'ramda';
import { appendMessage } from '../actions/messages';
import store from '../store';

const stream = wsock('ws://localhost:5000');

stream.pipe(
  through((buf, enc, next) => {
    store.dispatch(appendMessage(JSON.parse(buf.toString())));
    next();
  }),
);

const send = message => {
  stream.write(JSON.stringify(message));
};

export const chat = message => {
  send(_.assoc('code', 'chat', message));
};

export const checkin = name => {
  send({
    code: 'checkin',
    name,
  });
};
