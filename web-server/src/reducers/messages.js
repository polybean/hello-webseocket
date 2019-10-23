import * as _ from 'ramda';
import * as Actions from '../constants/action-types';

const DEFAULT_STATE = [];

const message = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case Actions.APPEND_MESSAGE:
      return _.append(action.payload, state);

    default:
      return state;
  }
};

export default message;
