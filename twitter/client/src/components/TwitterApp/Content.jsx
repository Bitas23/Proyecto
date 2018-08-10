// Dependencies
import { connect } from 'react-redux';
import React from 'react';
import { getUserTweets, getFollowers } from '../../../actions/Consult';
import { SingUpFormTwitter } from './Admind/SingUpFormTwitter.jsx';
import { SingUpForm } from './Admind/SingUpForm.jsx';
import { CreateUser } from './Admind/CreateUser.jsx';
import { Admind } from './Admind/Admind.jsx';
import { Followers } from './Followers.jsx';
import { UserTimeLine } from './UserTimeLine.jsx';
import { UserTimeLineUsers } from './UserTimeLineUsers.jsx';

const ContentComponent = ({
  isAuthenticated,
  loginUser,
  followers,
  userTimeLine,
  getTweetsActions,
  getFollowersActions,
  loginUserToken,
}) => {
  if (userTimeLine) {
    setInterval(
      getTweetsActions({
        accesToken: loginUserToken.accesToken,
        accesTokenSecret: loginUserToken.accesTokenSecret,
        consult: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        qs: { count: '5' },
        users: true,
      }),
      1000,
    );
  }
  if (followers) {
    getFollowersActions({
      accesToken: loginUserToken.accesToken,
      accesTokenSecret: loginUserToken.accesTokenSecret,
      consult: 'https://api.twitter.com/1.1/followers/list.json',
    });
  }
  return (
    <div className="Content">
      <div>
        {loginUser ? <SingUpFormTwitter /> : null}
        <SingUpForm />
        <CreateUser />
        {isAuthenticated ? (
          <div>
            <Admind />
            {userTimeLine ? <UserTimeLine /> : null}
            {followers ? <Followers /> : null}
            <UserTimeLineUsers />
          </div>
        ) : (
          <div>
            <h1>No Autenticate</h1>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loginUser: state.loginUser.isAuthenticated,
  followers: state.loginUser.followers,
  userTimeLine: state.loginUser.user_time_line,
  isAuthenticated: state.login.isAuthenticated,
  loginUserToken: state.loginUser.userTokens,
});
const mapDispatchToProps = dispatch => ({
  getTweetsActions: values => dispatch(getUserTweets(values)),
  getFollowersActions: values => dispatch(getFollowers(values)),
});
export const Content = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentComponent);
