import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { loginAndOut } from './loginAndOut';
import { consults } from './consult';
import { loadData } from './loadData';
import { loginUsers } from './loginUser';

export const TwitterAppReducer = combineReducers({
  account: loadData,
  login: loginAndOut,
  form: reduxFormReducer,
  consult: consults,
  loginUser: loginUsers,
});
