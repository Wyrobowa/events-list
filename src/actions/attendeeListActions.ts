import { Attendee } from '../types';
import { AppDispatch } from '../configureStore';

export const GET_ATTENDEE_LIST_SUCCESSFUL = 'GET_ATTENDEE_LIST_SUCCESSFUL';
export const GET_ATTENDEE_LIST_UNSUCCESSFUL = 'GET_ATTENDEE_LIST_UNSUCCESSFUL';

export const getAttendeeListSuccessful = (payload: Attendee[]) => ({
  type: GET_ATTENDEE_LIST_SUCCESSFUL,
  payload,
});

export const getAttendeeListUnsuccessful = () => ({
  type: GET_ATTENDEE_LIST_UNSUCCESSFUL,
});

export const requestAttendeeList = () => (dispatch: AppDispatch) => {
  fetch('http://localhost:3001/list')
    .then((res) => res.json())
    .then((json) => dispatch(getAttendeeListSuccessful(json.data)))
    .catch(() => dispatch(getAttendeeListUnsuccessful()));
};
