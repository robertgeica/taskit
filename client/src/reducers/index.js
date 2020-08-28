import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import card from './card';


export default combineReducers({
    auth,
    profile,
    card
});