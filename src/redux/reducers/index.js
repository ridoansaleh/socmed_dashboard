
import { combineReducers } from 'redux';
import { homeReducer } from './home_reducer';

const reducers = combineReducers({
  home: homeReducer
});

export default reducers