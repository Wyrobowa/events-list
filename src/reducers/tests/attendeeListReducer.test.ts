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

  it('should handle DELETE_ATTENDEE action', () => {
    const stateWithAttendee = {
      ...initialState,
      attendeeList: [{ slug: 'test-slug', firstName: 'Test' }],
    };
    const expectedState = {
      ...initialState,
      attendeeList: [],
    };

    expect(reducer(stateWithAttendee, {
      type: actions.DELETE_ATTENDEE,
      slug: 'test-slug',
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_ATTENDEE action', () => {
    const stateWithAttendee = {
      ...initialState,
      attendeeList: [{ slug: 'test-slug', firstName: 'Test' }],
    };
    const updatedAttendee = { slug: 'test-slug', firstName: 'Updated' };
    const expectedState = {
      ...initialState,
      attendeeList: [updatedAttendee],
    };

    expect(reducer(stateWithAttendee, {
      type: actions.UPDATE_ATTENDEE,
      payload: updatedAttendee,
    })).toEqual(expectedState);
  });

  it('should handle ADD_ATTENDEE action', () => {
    const attendee = { slug: 'new-attendee', firstName: 'New' };
    const expectedState = {
      ...initialState,
      attendeeList: [attendee],
    };

    expect(reducer(initialState, {
      type: actions.ADD_ATTENDEE,
      payload: attendee,
    })).toEqual(expectedState);
  });
});
