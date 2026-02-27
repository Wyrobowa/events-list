import reducer from '../attendeeListReducer';
import * as actions from '../../actions/attendeeListActions';

const initialState: any = {
  attendeeList: [],
  status: 'initial',
  msg: '',
};

describe('attendeeListReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ATTENDEE_LIST_SUCCESSFUL action', () => {
    const changedState = {
      ...initialState,
      attendeeList: [
        {
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          email: 'test@email.com',
          eventDate: '2020-01-01',
          slug: 'testemailcom',
        },
      ],
    };

    expect(reducer(initialState, {
      type: actions.GET_ATTENDEE_LIST_SUCCESSFUL,
      payload: [
        {
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          email: 'test@email.com',
          eventDate: '2020-01-01',
          slug: 'testemailcom',
        },
      ],
    })).toEqual(changedState);
  });

  it('should handle GET_ATTENDEE_LIST_UNSUCCESSFUL action', () => {
    const changedState = {
      ...initialState,
      msg: 'Something went wrong! List of attendees couldn\'t be loaded!',
      status: 'danger',
    };

    expect(reducer(initialState, {
      type: actions.GET_ATTENDEE_LIST_UNSUCCESSFUL,
    })).toEqual(changedState);
  });
});
