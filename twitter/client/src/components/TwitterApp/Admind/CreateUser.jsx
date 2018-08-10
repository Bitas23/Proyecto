import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { newUser } from '../../../../actions/Consult';

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

const CreateUserComponent = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  loginUser,
  newUserActions,
}) => {
  const content = loginUser ? null : (
    <div>
      <form onSubmit={handleSubmit(newUserActions)}>
        <div>
          <Field
            name="id"
            component={renderField}
            label="Create User"
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
};

const CreateUserForm = reduxForm({
  form: 'create_user',
})(CreateUserComponent);

const mapStateToProps = state => ({
  loginUser: state.loginUser.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  newUserActions: values => dispatch(newUser(values)),
});

export const CreateUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUserForm);
