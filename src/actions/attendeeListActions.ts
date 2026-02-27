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
