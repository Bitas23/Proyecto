import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { getUserTweetsUsers } from '../../../actions/Consult';

const UserTimeLineUsersComponent = ({ loginUser, getTweets, tweets }) => {
  let textToDispay;
  if (loginUser.admind) {
    if (tweets.length) {
      textToDispay = (
        <ListGroup>
          {tweets.map(
            (item, index) =>
              item.users.length ? (
                <ListGroupItem key={[index]}>
                  <ListGroup>
                    {item.users.map(item2 => (
                      <ListGroupItem key={item2.text}>
                        {item2.user.location} <br />
                        <img
                          src={item2.user.profile_image_url_https}
                          width="50"
                          height="50"
                          alt={item2.user.profile_image_url_https}
                        />
                        {item2.user.name}
                        <br />
                        {item2.text}
                        <br />
                        <a href={item2.user.url} target="_blank">
                          {item2.user.url}
                        </a>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </ListGroupItem>
              ) : null,
          )}
        </ListGroup>
      );
    }
    const trueUsers = typeof loginUser.admind.users === 'undefined';
    if (!trueUsers) {
      const x = loginUser.admind.users.users_list.length === tweets.length;
      if (!x) {
        const users = [loginUser.admind.users.users_list.length];
        loginUser.admind.users.users_list.map((item, index) => {
          users[index] = {
            accesToken: loginUser.userTokens.accesToken,
            accesTokenSecret: loginUser.userTokens.accesTokenSecret,
            consult: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
            qs: { count: '2', screen_name: item.value },
            users: true,
          };
        });
        getTweets(users);
      }
    }
  }
  return !loginUser.admind ? (
    <div />
  ) : (
    <div>
      <br />
      <br />
      <form>
        <h3>User Time Line Users </h3>

        {textToDispay}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  loginUser: state.loginUser,
  tweets: state.consult.tweetsUsers,
});

const mapDispatchToProps = dispatch => ({
  getTweets: values => dispatch(getUserTweetsUsers(values)),
});

export const UserTimeLineUsers = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTimeLineUsersComponent);
