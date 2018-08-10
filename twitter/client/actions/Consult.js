const apiKey = 'APIKEY_DATABASE';
const urlDataBase =
  'URL_SERVER_DATABASE';
const urlConsults = 'http://localhost:3000/api/v1/consults';

export const loginError = error => ({
  type: 'LOGIN_ERROR',
  payload: error,
});

export const loginSuccess = (token, user) => ({
  type: 'LOGIN_SUCCESS',
  payload: { token, user },
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const getUserTweetsError = error => ({
  type: 'GET_ERROR',
  payload: error,
});

export const getUserTweetsSuccess = data => ({
  type: 'GET_TWEET_SUCCESS',
  payload: data,
});

export const getUserTweetsUsersSuccess = data => ({
  type: 'GET_TWEET_USERS_SUCCESS',
  payload: data,
});

export const getUserTweetsUsersDestroy = data => ({
  type: 'GET_TWEET_USERS_DESTROY',
  payload: data,
});

export const getUserTweetsUsersError = error => ({
  type: 'GET_USERS_ERROR',
  payload: error,
});

export const getFollowersError = error => ({
  type: 'GET_ERROR_FOLLOWERS',
  payload: error,
});

export const getFollowersSuccess = data => ({
  type: 'GET_FOLLOWERS_SUCCESS',
  payload: data,
});

export const getUserTweetsDestroy = data => ({
  type: 'GET_TWEET_DESTROY',
  payload: data,
});
export const getFollowersDestroy = data => ({
  type: 'GET_FOLLOWERS_DESTROY',
  payload: data,
});

export const load = data => ({
  type: 'LOAD',
  data,
});

export const loginErrorUser = error => ({
  type: 'GET_ERROR_USER',
  payload: error,
});

export const loginSuccessUser = (
  token,
  user,
  userLogin,
  userTokens,
  admind,
) => ({
  type: 'GET_DATA_USER',
  payload: { token, user, userLogin, userTokens, admind },
});

export const loginSuccessUserNoTwitter = (
  token,
  user,
  userLogin,
  userTokens,
) => ({
  type: 'GET_DATA_USER_NO_TWITTER',
  payload: { token, user, userLogin, userTokens },
});

export const logoutUser = () => ({
  type: 'GET_LOGOUT_USER',
});

export const logoutUserAll = () => dispatch => {
  dispatch(logoutUser());
  dispatch(logout());
  dispatch(getUserTweetsDestroy());
  dispatch(getFollowersDestroy());
  dispatch(getUserTweetsUsersDestroy());
};

export const consultDataLogin = values => dispatch => {
  fetch(
    `${urlDataBase}${JSON.stringify(values.id).replace(
      /['"]+/g,
      '',
    )}/?apiKey=${apiKey}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .then(response => {
      const ConsultValidate =
        JSON.stringify(response) === '{"message":"Document not found"}';

      if (ConsultValidate) {
        dispatch(loginErrorUser(response));
      } else {
        const UserLogin = response.id;

        const userValidate =
          typeof JSON.stringify(response.user) === 'undefined';
        if (!userValidate) {
          const User = response.user;
          const Token = response.token;
          const UserTokens = response.userTokens;
          const Admind = response.admind;
          const TokenValidate = JSON.stringify(Token) === '"default"';
          if (!TokenValidate) {
            const trueAdmind = typeof Admind.followers === 'undefined';
            if (!trueAdmind) {
              dispatch(load(Admind));
            } else {
              const Data = {
                id: User.id.replace(/['"]+/g, ''),
                followers: false,
                user_time_line: false,
              };
              dispatch(load(Data));
            }
            dispatch(loginSuccess(Token, User));
            dispatch(
              loginSuccessUser(Token, User, UserLogin, UserTokens, Admind),
            );
          } else {
            console.log('else');
            dispatch(
              loginSuccessUserNoTwitter(
                Token,
                User,
                UserLogin,
                UserTokens,
                Admind,
              ),
            );
          }
        } else {
          const User = '';
          const Token = 'default';
          const UserTokens = 'default';
          dispatch(
            loginSuccessUserNoTwitter(Token, User, UserLogin, UserTokens),
          );
        }
      }
    })
    .catch(error => {
      console.log('no existe', error);
      dispatch(loginErrorUser(error));
    });
};

export const updateUser = values => dispatch => {
  fetch(
    `${urlDataBase}${JSON.stringify(values.id).replace(
      /['"]+/g,
      '',
    )}/?apiKey=${apiKey}`,
    {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .then(response => {
      dispatch(getUserTweetsUsersDestroy());
      dispatch(consultDataLogin(response));
    })
    .catch(error => {
      console.log('error', error);
    });
};

export const logoutTwitter = values => dispatch => {
  const Update = { userLogin: values, id: values };
  dispatch(logout());
  dispatch(updateUser(Update));
  dispatch(getUserTweetsDestroy());
  dispatch(getFollowersDestroy());
  dispatch(getUserTweetsUsersDestroy());
};

export const updateData = (
  Token,
  User,
  UserLogin,
  UserTokens,
  Admind,
) => dispatch => {
  const update = {
    token: Token,
    user: User,
    userLogin: UserLogin,
    id: UserLogin,
    userTokens: UserTokens,
    admind: Admind,
  };
  dispatch(loginSuccess(Token, User));
  dispatch(loginSuccessUser(Token, User, UserLogin, UserTokens, Admind));
  dispatch(updateUser(update));
};

export const getUserTweets = values => dispatch => {
  fetch(urlConsults, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .then(response => {
      dispatch(getUserTweetsSuccess(response));
    })
    .catch(err => dispatch(getUserTweetsError(err)));
};
export const getFollowers = values => dispatch => {
  fetch(urlConsults, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .then(response => {
      dispatch(getFollowersSuccess(response.users));
    })
    .catch(err => dispatch(getFollowersError(err)));
};

export const getUserTweetsUsers = values => dispatch => {
  const users = [values.length];
  let x = 0;
  values.map(item => {
    fetch(urlConsults, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then(response => response.json())
      .then(response => {
        users[x] = { users: response };
        x = 1 + x;
        const UsersTrue = x === values.length;
        if (UsersTrue) {
          dispatch(getUserTweetsUsersSuccess(users));
        }
      })
      .catch(err => dispatch(getUserTweetsUsersError(err)));
  });
};

export const newUser = values => dispatch => {
  fetch(
    `${urlDataBase}${JSON.stringify(values.id).replace(
      /['"]+/g,
      '',
    )}/?apiKey=${apiKey}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .then(response => {
      const newUserDataBase =
        JSON.stringify(response) === '{"message":"Document not found"}';
      if (newUserDataBase) {
        fetch(
          `${urlDataBase}${JSON.stringify(values.id).replace(
            /['"]+/g,
            '',
          )}/?apiKey=${apiKey}`,
          {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
          .then()
          .then(() => {
            console.log('creado');
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('Ya existe');
      }
    })
    .catch(error => {
      dispatch(loginErrorUser(error));
    });
};
