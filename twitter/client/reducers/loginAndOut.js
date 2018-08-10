const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: null,
};

export const loginAndOut = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      sessionStorage.setItem('token', null);
      return Object.assign({}, state, {
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
      });
    case 'LOGIN_ERROR':
      return Object.assign({}, state, {
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      });
    case 'LOGIN_SUCCESS':
      sessionStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, {
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      });
    default:
      return state;
  }
};
