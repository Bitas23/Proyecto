import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import {
  loginError,
  updateData,
  logoutTwitter,
  load as loadAccount,
} from '../../../../actions/Consult';

class SingUpFormTwitterComponet extends Component {
  constructor(props) {
    super(props);
    this.twitterResponse = this.twitterResponse.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.logout = this.logout.bind(this);
  }

  onFailure = error => {
    this.props.onLoginErrorActions(error);
  };
  logout = () => {
    this.props.loadActions();

    this.props.logoutActions(this.props.loginUser.userLogin);
  };

  twitterResponse = response => {
    const token = response.headers.get('x-auth-token');
    response.json().then(body => {
      if (token) {
        const userLogin = this.props.loginUser.userLogin;
        const userTokens = {
          accesToken: body.tokens.oauth_token,
          accesTokenSecret: body.tokens.oauth_token_secret,
        };
        this.props.updateDataActions(token, body.user, userLogin, userTokens, {
          id: body.user.id,
        });
      }
    });
  };

  render() {
    const content = this.props.isAuthenticated ? (
      <div>
        <div>
          <img
            src={this.props.user.photos[0].value}
            alt={this.props.user.photos[0].value}
          />
          {this.props.user.displayName}
        </div>
        <div>
          <button onClick={this.logout} className="button">
            Log out twitter
          </button>
        </div>
      </div>
    ) : (
      <div>
        <TwitterLogin
          TwitterLogin
          loginUrl="http://localhost:3000/api/v1/auth/twitter"
          onFailure={this.onFailure}
          onSuccess={this.twitterResponse}
          requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse"
        />
      </div>
    );

    return <div className="App">{content}</div>;
  }
}

const mapStateToProps = state => ({
  token: state.login.token,
  user: state.login.user,
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  loginUser: state.loginUser,
});

const mapDispatchToProps = dispatch => ({
  onLoginErrorActions: err => dispatch(loginError(err.message)),
  loadActions: values => dispatch(loadAccount(values)),
  logoutActions: userLogin => dispatch(logoutTwitter(userLogin)),
  updateDataActions: (token, user, userLogin, userTokens, admin) =>
    dispatch(updateData(token, user, userLogin, userTokens, admin)),
});

export const SingUpFormTwitter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingUpFormTwitterComponet);
