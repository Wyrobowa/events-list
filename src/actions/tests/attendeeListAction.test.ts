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
});
