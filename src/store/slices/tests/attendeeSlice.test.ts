import { describe, it, expect } from 'vitest';
import reducer, {
  editAttendeeForm,
  setAttendeeForm,
  clearAttendeeForm,
  resetStatus,
} from '../attendeeSlice';
import { AttendeeFormState, Attendee } from '../../../types';

const initialState: AttendeeFormState = {
  attendeeForm: {
    firstName: '',
    lastName: '',
    email: '',
    eventDate: '',
    ticketType: 'standard',
    eventTitle: '',
    eventDescription: '',
  },
  status: 'initial',
  msg: '',
  formValidationErrors: [],
};

describe('attendeeSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle editAttendeeForm', () => {
    const actual = reducer(initialState, editAttendeeForm({ field: 'firstName', value: 'John' }));
    expect(actual.attendeeForm.firstName).toBe('John');
  });

  it('should handle setAttendeeForm', () => {
    const attendee: Attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      eventDate: '2026-01-01',
      ticketType: 'standard',
      eventTitle: 'Test Event',
      eventDescription: 'Test Description',
      slug: 'john-doe',
    };
    const actual = reducer(initialState, setAttendeeForm(attendee));
    expect(actual.attendeeForm).toEqual(attendee);
  });

  it('should handle clearAttendeeForm', () => {
    const state = {
      ...initialState,
      attendeeForm: {
        firstName: 'John',
        lastName: 'Doe',
        email: '',
        eventDate: '',
        ticketType: 'standard' as const,
        eventTitle: '',
        eventDescription: '',
      },
    };
    const actual = reducer(state, clearAttendeeForm());
    expect(actual.attendeeForm).toEqual(initialState.attendeeForm);
  });

  it('should handle resetStatus', () => {
    const state = {
      ...initialState,
      status: 'success' as const,
      formValidationErrors: ['error'],
    };
    const actual = reducer(state, resetStatus());
    expect(actual.status).toBe('initial');
    expect(actual.formValidationErrors).toEqual([]);
  });
});
