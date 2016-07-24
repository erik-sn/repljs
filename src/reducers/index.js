import { combineReducers } from 'redux';

import DisplayReducer from './reducer_displays';
import OptionReducer from './reducer_options';
import HistoryReducer from './reducer_history';
const rootReducer = combineReducers({
  displays: DisplayReducer,
  options: OptionReducer,
  history: HistoryReducer,
});

export default rootReducer;
