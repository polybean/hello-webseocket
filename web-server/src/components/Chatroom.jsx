/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'ramda';
import { sendMessage } from '../actions/messages';

class Chatroom extends React.Component {
  arrangeMessages = _.map(m => (
    // WTF key is!!!
    <li key={m.from + m.to + m.message}>
      {m.from}: {m.text}
    </li>
  ));

  sendMessage = () => {
    this.props.send({
      from: this.props.user,
      to: this.recipient.value,
      text: this.textInput.value,
    });
  };

  render = () => (
    <div>
      <p>Welcome {this.props.user}</p>
      <label htmlFor="recipient">
        Recipient:
        <input
          type="text"
          ref={input => {
            this.recipient = input;
          }}
          id="recipient"
        />
      </label>
      <br />
      <label htmlFor="message">
        Message:
        <input
          type="text"
          ref={input => {
            this.textInput = input;
          }}
          id="message"
        />
      </label>
      <button onClick={this.sendMessage}>Send</button>
      <ul>{this.arrangeMessages(this.props.messages)}</ul>
    </div>
  );
}

Chatroom.propTypes = {
  user: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  send: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user, messages }) => ({
  user,
  messages,
});

const mapDispatchToProps = dispatch => ({
  send: message => dispatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
