import { configureStore } from '@reduxjs/toolkit';
import attendeeReducer from './store/slices/attendeeSlice';
import attendeeListReducer from './store/slices/attendeeListSlice';
import authReducer from './store/slices/authSlice';

const store = configureStore({
  reducer: {
    attendee: attendeeReducer,
    attendeeList: attendeeListReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default () => store;
