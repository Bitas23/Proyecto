const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: null,
  userLogin: null,
  userTokens: null,
  admind: null,
  followers: false,
  user_time_line: false,
};

export const loginUsers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LOGOUT_USER':
      sessionStorage.setItem('token', null);
      return Object.assign({}, state, {
        token: null,
        isAuthenticated: false,
        user: null,
        userLogin: null,
        error: null,
        userTokens: null,
        admind: null,
        followers: false,
        user_time_line: false,
      });
    case 'GET_ERROR_USER':
      return Object.assign({}, state, {
        token: null,
        isAuthenticated: false,
        user: null,
        userLogin: null,
        error: action.payload,
        userTokens: null,
        admind: null,
        followers: false,
        user_time_line: false,
      });
    case 'GET_DATA_USER':
      sessionStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, {
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        userLogin: action.payload.userLogin,
        error: null,
        userTokens: action.payload.userTokens,
        admind: action.payload.admind,
        followers: action.payload.admind.followers,
        user_time_line: action.payload.admind.user_time_line,
      });
    case 'GET_DATA_USER_NO_TWITTER':
      sessionStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, {
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        userLogin: action.payload.userLogin,
        error: null,
        userTokens: action.payload.userTokens,
        admind: action.payload.admind,
        followers: false,
        user_time_line: false,
      });
    default:
      return state;
  }
};
