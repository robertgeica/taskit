import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import card from './card';
import company from './company';

export default combineReducers({
    auth,
    profile,
    card,
    company
});