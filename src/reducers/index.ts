import { combineReducers } from '@reduxjs/toolkit';

import attendee from './attendeeFormReducer';
import attendeeList from './attendeeListReducer';

const AppReducers = combineReducers({
  attendee,
  attendeeList,
});

export default AppReducers;
