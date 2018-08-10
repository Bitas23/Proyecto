import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import createClass from 'create-react-class';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateData, load as loadAccount } from '../../../../actions/Consult';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);
const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={(input.value = input.value === true)}
    onCheck={input.onChange}
  />
);
const renderInput = props => (
  <SelectOption
    value={props.input.value}
    onChange={value => {
      props.input.onChange(value);
    }}
  />
);

const SelectOption = createClass({
  getInitialState() {
    return {
      multi: true,
      multiValue: [],
      options: [],
      value: {},
    };
  },
  handleOnChange(value) {
    const users_list = value.map(obj => ({
      label: obj.label,
      value: obj.value,
    }));
    this.props.onChange({ users_list });
    this.setState({ multiValue: users_list });
  },
  render() {
    const { multi, options } = this.state;
    return (
      <div>
        <Select.Creatable
          multi={multi}
          options={options}
          onChange={this.handleOnChange}
          value={this.props.value.users_list}
        />
      </div>
    );
  },
});

class AdmindComponent extends Component {
  UNSAFE_componentWillMount() {
    this.send_data = this.send_data.bind(this);
  }

  componentWillUnmount() {
    this.props.loadActions();
  }

  send_data = admind => {
    this.props.updateDataActions(
      this.props.loginUser.token,
      this.props.loginUser.user,
      this.props.loginUser.userLogin,
      this.props.loginUser.userTokens,
      admind,
    );
  };
  render() {
    const { handleSubmit, reset, submitting, user } = this.props;
    const content = (
      <form onSubmit={handleSubmit(this.send_data)}>
        <div>
          <Field
            name="id"
            label={user.displayName}
            component={renderTextField}
            disabled
          />
        </div>

        <div>
          <Field
            name="followers"
            component={renderCheckbox}
            label="Followers"
          />
        </div>

        <div>
          <Field
            name="user_time_line"
            component={renderCheckbox}
            label="User Time Line"
          />
        </div>

        <div>
          <Field name="users" component={renderInput} list={[]} />
        </div>

        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={submitting} onClick={reset}>
            initial state
          </button>
        </div>
      </form>
    );
    return (
      <div>
        <h1>Administrator</h1>
        <pre>{content}</pre>
      </div>
    );
  }
}

const AdmindForm = reduxForm({
  form: 'Admind',
})(AdmindComponent);

const mapStateToProps = state => ({
  user: state.login.user,
  loginUser: state.loginUser,
  isAuthenticated: state.login.isAuthenticated,
  initialValues: state.account.data,
});
const mapDispatchToProps = dispatch => ({
  updateDataActions: (token, user, userLogin, userTokens, admind) =>
    dispatch(updateData(token, user, userLogin, userTokens, admind)),
  loadActions: values => dispatch(loadAccount(values)),
});

export const Admind = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdmindForm);
