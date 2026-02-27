import { describe, it, expect } from 'vitest';
import reducer, {
  addAttendee,
  updateAttendee,
  deleteAttendee,
  clearAllAttendees,
} from '../attendeeListSlice';
import { Attendee } from '../../../types';

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
    const attendee: Attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      eventDate: '2026-01-01',
      ticketType: 'standard',
      slug: 'john-doe',
    };
    const actual = reducer(initialState, addAttendee(attendee));
    expect(actual.attendeeList).toHaveLength(1);
    expect(actual.attendeeList[0]).toEqual(attendee);
  });

  it('should handle updateAttendee', () => {
    const attendee: Attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      eventDate: '2026-01-01',
      ticketType: 'standard',
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
    const attendee: Attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      eventDate: '2026-01-01',
      ticketType: 'standard',
      slug: 'john-doe',
    };
    const state = {
      ...initialState,
      attendeeList: [attendee],
    };
    const actual = reducer(state, deleteAttendee('john-doe'));
    expect(actual.attendeeList).toHaveLength(0);
  });

  it('should handle clearAllAttendees', () => {
    const state = {
      ...initialState,
      attendeeList: [
        { firstName: 'John', lastName: 'Doe', email: 'j@d.com', eventDate: '2026-01-01', ticketType: 'standard' as const, slug: '1' },
        { firstName: 'Jane', lastName: 'Doe', email: 'ja@d.com', eventDate: '2026-01-02', ticketType: 'standard' as const, slug: '2' },
      ],
    };
    const actual = reducer(state, clearAllAttendees());
    expect(actual.attendeeList).toHaveLength(0);
  });
});
