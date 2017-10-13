import {combineReducers} from 'redux';
import profile from './profile';
import auth from './auth';
import photos from './photos';

export default combineReducers({
  auth,
  profile,
  photos,
});