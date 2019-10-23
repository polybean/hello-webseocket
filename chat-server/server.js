const http = require('http');
const through = require('through2');
const wsock = require('websocket-stream');
const _ = require('ramda');
const eos = require('end-of-stream');

const server = http.createServer();
server.listen(5000);

var mapping = {};

const checkin = (message, stream) => {
  const name = message.name;
  mapping[name] = stream;
  eos(stream, () => {
    console.log(`${name} disconnected`);
    delete mapping[name];
  });
};

const chat = message => {
  mapping[message.to].write(JSON.stringify(message));
};

const handler = stream =>
  through((buf, enc, next) => {
    const message = JSON.parse(buf.toString());

    switch (message.code) {
      case 'checkin':
        checkin(message, stream);
        break;

      case 'chat':
        chat(message);
        break;

      default:
        break;
    }

    next(null, JSON.stringify(message));
  });

wsock.createServer({ server }, stream => {
  stream.pipe(handler(stream)).pipe(process.stdout);
});
