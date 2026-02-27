import * as actions from '../attendeeListActions';

describe('attendeeListActions', () => {
  it('should create an action to getAttendeeListSuccessful', () => {
    const expectedAction = {
      type: actions.GET_ATTENDEE_LIST_SUCCESSFUL,
      payload: [],
    };
    expect(actions.getAttendeeListSuccessful([])).toEqual(expectedAction);
  });

  it('should create an action to getAttendeeListUnsuccessful', () => {
    const expectedAction = {
      type: actions.GET_ATTENDEE_LIST_UNSUCCESSFUL,
    };
    expect(actions.getAttendeeListUnsuccessful()).toEqual(expectedAction);
  });

  it('should create an action to deleteAttendee', () => {
    const expectedAction = {
      type: actions.DELETE_ATTENDEE,
      slug: 'test-slug',
    };
    expect(actions.deleteAttendee('test-slug')).toEqual(expectedAction);
  });

  it('should create an action to updateAttendee', () => {
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      eventDate: '2026-05-20',
      slug: 'john-doe',
    };
    const expectedAction = {
      type: actions.UPDATE_ATTENDEE,
      payload: attendee,
    };
    expect(actions.updateAttendee(attendee)).toEqual(expectedAction);
  });

  it('should create an action to addAttendee', () => {
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      eventDate: '2026-05-20',
      slug: 'john-doe',
    };
    const expectedAction = {
      type: actions.ADD_ATTENDEE,
      payload: attendee,
    };
    expect(actions.addAttendee(attendee)).toEqual(expectedAction);
  });
});
