import { RootState } from '../types';
import * as actions from '../actions/attendeeListActions';
import { AttendeeListState } from '../types';

const initialState: AttendeeListState = {
  attendeeList: [],
  status: 'initial',
  msg: '',
};

const attendeeListReducer = (state = initialState, action: any): AttendeeListState => {
  switch (action.type) {
    case actions.GET_ATTENDEE_LIST_SUCCESSFUL:
      return {
        ...state,
        attendeeList: action.payload,
        status: 'initial',
      };
    case actions.DELETE_ATTENDEE:
      return {
        ...state,
        attendeeList: state.attendeeList.filter((attendee) => attendee.slug !== action.slug),
      };
    case actions.UPDATE_ATTENDEE:
      return {
        ...state,
        attendeeList: state.attendeeList.map((attendee) => (
          attendee.slug === action.payload.slug ? action.payload : attendee
        )),
      };
    case actions.ADD_ATTENDEE:
      return {
        ...state,
        attendeeList: [...state.attendeeList, action.payload],
      };
    case actions.GET_ATTENDEE_LIST_UNSUCCESSFUL:
      return {
        ...state,
        status: 'danger',
        msg: 'Something went wrong! List of attendees couldn\'t be loaded!',
      };
    default:
      return state;
  }
};

export const getAttendeesList = (state: RootState) => state.attendeeList.attendeeList;
export const getStatus = (state: RootState) => state.attendeeList.status;
export const getMessage = (state: RootState) => state.attendeeList.msg;

export default attendeeListReducer;
