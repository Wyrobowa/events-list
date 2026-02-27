import * as actions from '../attendeeFormActions';

describe('attendeeFormActions', () => {
  it('should create an action to editAttendeeForm', () => {
    const expectedAction = {
      type: actions.EDIT_ATTENDEE_FORM,
      field: 'firstName',
      value: 'John',
    };
    expect(actions.editAttendeeForm('firstName', 'John')).toEqual(expectedAction);
  });

  it('should create an action to clearAttendeeForm', () => {
    const expectedAction = {
      type: actions.CLEAR_ATTENDEE_FORM,
    };
    expect(actions.clearAttendeeForm()).toEqual(expectedAction);
  });

  it('should create an action to sendAttendeeFormSuccessful', () => {
    const expectedAction = {
      type: actions.SEND_ATTENDEE_FORM_SUCCESSFUL,
    };
    expect(actions.sendAttendeeFormSuccessful()).toEqual(expectedAction);
  });

  it('should create an action to sendAttendeeFormUnsuccessful', () => {
    const expectedAction = {
      type: actions.SEND_ATTENDEE_FORM_UNSUCCESSFUL,
    };
    expect(actions.sendAttendeeFormUnsuccessful()).toEqual(expectedAction);
  });

  it('should create an action to resetStatus', () => {
    const expectedAction = {
      type: actions.RESET_STATUS,
    };
    expect(actions.resetStatus()).toEqual(expectedAction);
  });

  it('should create an action to formValidationErrors', () => {
    const expectedAction = {
      type: actions.FORM_VALIDATION_ERRORS,
      errors: ['error'],
    };
    expect(actions.formValidationErrors(['error'])).toEqual(expectedAction);
  });
});
