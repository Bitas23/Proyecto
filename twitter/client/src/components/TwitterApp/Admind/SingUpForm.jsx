import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { consultDataLogin, logoutUserAll } from '../../../../actions/Consult';

const renderField = ({
  input,
  label,
  meta: { touched, error, warning },
  type,
}) => (
  <div>
    <input type={type} {...input} placeholder={label} />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

class SingUpFormComponent extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    this.props.logoutUserActions();
  };

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      loginUser,
      consultdataLoginActions,
    } = this.props;

    const content = loginUser ? (
      <div>
        <button onClick={this.logout} className="button">
          Log out
        </button>
      </div>
    ) : (
      <div>
        <form onSubmit={handleSubmit(consultdataLoginActions)}>
          <div>
            <Field
              name="id"
              component={renderField}
              label="iniciar sesion"
              type="text"
            />
          </div>

          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );

    return <div className="App">{content}</div>;
  }
}

const SingUpFormComponentForm = reduxForm({
  form: 'Login',
})(SingUpFormComponent);

const mapStateToProps = state => ({
  token: state.login.token,
  user: state.login.user,
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  loginUser: state.loginUser.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logoutUserActions: () => dispatch(logoutUserAll()),
  consultdataLoginActions: values => dispatch(consultDataLogin(values)),
});

export const SingUpForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingUpFormComponentForm);
