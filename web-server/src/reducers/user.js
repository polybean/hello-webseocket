import faker from 'faker';

const DEFAULT_STATE = faker.name.findName();

const user = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
