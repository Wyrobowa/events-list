import { describe, it, expect } from 'vitest';
import reducer, {
  addAttendee,
  updateAttendee,
  deleteAttendee,
} from '../attendeeListSlice';

const initialState = {
  attendeeList: [],
  status: 'initial' as const,
  msg: '',
};

describe('attendeeListSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addAttendee', () => {
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      eventDate: '2026-01-01',
      slug: 'john-doe',
    };
    const actual = reducer(initialState, addAttendee(attendee));
    expect(actual.attendeeList).toHaveLength(1);
    expect(actual.attendeeList[0]).toEqual(attendee);
  });

  it('should handle updateAttendee', () => {
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      eventDate: '2026-01-01',
      slug: 'john-doe',
    };
    const state = {
      ...initialState,
      attendeeList: [attendee],
    };
    const updatedAttendee = { ...attendee, firstName: 'Jane' };
    const actual = reducer(state, updateAttendee(updatedAttendee));
    expect(actual.attendeeList[0].firstName).toBe('Jane');
  });

  it('should handle deleteAttendee', () => {
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      eventDate: '2026-01-01',
      slug: 'john-doe',
    };
    const state = {
      ...initialState,
      attendeeList: [attendee],
    };
    const actual = reducer(state, deleteAttendee('john-doe'));
    expect(actual.attendeeList).toHaveLength(0);
  });
});
