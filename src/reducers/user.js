// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_USER_STATE = {
  email: '',
};

export const LOGIN = 'LOGIN';

const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
