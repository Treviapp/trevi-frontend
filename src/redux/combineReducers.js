import { combineReducers } from 'redux';
import userSessionReducer from './reducers/userSession';

export default combineReducers({
  userSession: userSessionReducer,
});
