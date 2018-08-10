const initialState = {
  error: null,
  tweets: [],
  followers: [],
  tweetsUsers: [],
};

export const consults = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TWEET_SUCCESS':
      return Object.assign({}, state, { error: null, tweets: action.payload });
    case 'GET_TWEET_DESTROY':
      return Object.assign({}, state, { error: null, tweets: [] });
    case 'GET_ERROR':
      return Object.assign({}, state, { error: action.payload, tweets: [] });

    case 'GET_TWEET_USERS_SUCCESS':
      return Object.assign({}, state, {
        error: null,
        tweetsUsers: action.payload,
      });
    case 'GET_TWEET_USERS_DESTROY':
      return Object.assign({}, state, { error: null, tweetsUsers: [] });
    case 'GET_USERS_ERROR':
      return Object.assign({}, state, {
        error: action.payload,
        tweetsUsers: [],
      });

    case 'GET_FOLLOWERS_SUCCESS':
      return Object.assign({}, state, {
        error: null,
        followers: action.payload,
      });
    case 'GET_FOLLOWERS_DESTROY':
      return Object.assign({}, state, { error: null, followers: [] });
    case 'GET_ERROR_FOLLOWERS':
      return Object.assign({}, state, { error: action.payload, followers: [] });
    default:
      return state;
  }
};
