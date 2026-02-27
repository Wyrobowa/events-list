import reducer from '../attendeeFormReducer';
import * as actions from '../../actions/attendeeFormActions';

const initialState: any = {
  attendeeForm: {
    firstName: '',
    lastName: '',
    email: '',
    eventDate: '',
  },
  status: 'initial',
  msg: '',
  formValidationErrors: [],
};

describe('attendeeFormReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle EDIT_ATTENDEE_FORM action', () => {
    const changedState = {
      ...initialState,
      attendeeForm: {
        ...initialState.attendeeForm,
        firstName: 'Test Name',
      },
    };

    expect(reducer(initialState, {
      type: actions.EDIT_ATTENDEE_FORM,
      field: 'firstName',
      value: 'Test Name',
    })).toEqual(changedState);
  });

  it('should handle CLEAR_ATTENDEE_FORM action', () => {
    expect(reducer(initialState, {
      type: actions.CLEAR_ATTENDEE_FORM,
    })).toEqual(initialState);
  });

  it('should handle SEND_ATTENDEE_FORM_SUCCESSFUL action', () => {
    const changedState = {
      ...initialState,
      status: 'success',
      msg: 'Form has been saved!',
    };

    expect(reducer(initialState, {
      type: actions.SEND_ATTENDEE_FORM_SUCCESSFUL,
    })).toEqual(changedState);
  });

  it('should handle SEND_ATTENDEE_FORM_UNSUCCESSFUL action', () => {
    const changedState = {
      ...initialState,
      status: 'danger',
      msg: 'Something went wrong!',
    };

    expect(reducer(initialState, {
      type: actions.SEND_ATTENDEE_FORM_UNSUCCESSFUL,
    })).toEqual(changedState);
  });

  it('should handle RESET_STATUS action', () => {
    const changedState = {
      ...initialState,
      status: 'initial',
    };

    expect(reducer(initialState, {
      type: actions.RESET_STATUS,
    })).toEqual(changedState);
  });

  it('should handle FORM_VALIDATION_ERRORS action', () => {
    const changedState = {
      ...initialState,
      status: 'danger',
      msg: 'Form validation errors!',
      formValidationErrors: ['Test error 1', 'Test error 2'],
    };

    expect(reducer(initialState, {
      type: actions.FORM_VALIDATION_ERRORS,
      errors: ['Test error 1', 'Test error 2'],
    })).toEqual(changedState);
  });
});
