import { Attendee } from '../types';
import { AppDispatch } from '../configureStore';

export const GET_ATTENDEE_LIST_SUCCESSFUL = 'GET_ATTENDEE_LIST_SUCCESSFUL';
export const GET_ATTENDEE_LIST_UNSUCCESSFUL = 'GET_ATTENDEE_LIST_UNSUCCESSFUL';
export const DELETE_ATTENDEE = 'DELETE_ATTENDEE';
export const UPDATE_ATTENDEE = 'UPDATE_ATTENDEE';
export const ADD_ATTENDEE = 'ADD_ATTENDEE';

export const getAttendeeListSuccessful = (payload: Attendee[]) => ({
  type: GET_ATTENDEE_LIST_SUCCESSFUL,
  payload,
});

export const getAttendeeListUnsuccessful = () => ({
  type: GET_ATTENDEE_LIST_UNSUCCESSFUL,
});

export const deleteAttendee = (slug: string) => ({
  type: DELETE_ATTENDEE,
  slug,
});

export const updateAttendee = (attendee: Attendee) => ({
  type: UPDATE_ATTENDEE,
  payload: attendee,
});

export const addAttendee = (attendee: Attendee) => ({
  type: ADD_ATTENDEE,
  payload: attendee,
});

export const requestAttendeeList = () => (dispatch: AppDispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((json) => {
      // jsonplaceholder returns an array of posts, we map them to Attendees for consistency
      const attendees = json.slice(0, 10).map((post: any) => ({
        firstName: post.title.split(' ')[0],
        lastName: post.title.split(' ')[1] || 'Lastname',
        email: `user${post.id}@example.com`,
        eventDate: '2026-05-20',
        slug: `attendee-${post.id}`,
      }));
      dispatch(getAttendeeListSuccessful(attendees));
    })
    .catch(() => dispatch(getAttendeeListUnsuccessful()));
};
