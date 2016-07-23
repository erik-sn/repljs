import { combineReducers } from 'redux';

import DisplayReducer from './reducer_displays';
import OptionReducer from './reducer_options';
const rootReducer = combineReducers({
  displays: DisplayReducer,
  options: OptionReducer,
});

export default rootReducer;
