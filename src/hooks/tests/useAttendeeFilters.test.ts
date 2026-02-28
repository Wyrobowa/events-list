import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAttendeeFilters } from '../useAttendeeFilters';
import { Attendee } from '../../types';

const mockAttendees: Attendee[] = [
  {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    eventDate: '2026-05-20',
    ticketType: 'standard',
    eventTitle: 'React Conf',
    eventDescription: 'Frontend focus',
    slug: 'alice-smith',
  },
  {
    firstName: 'Bob',
    lastName: 'Jones',
    email: 'bob@example.com',
    eventDate: '2026-05-21',
    ticketType: 'vip',
    eventTitle: 'Vite Day',
    eventDescription: 'Build tools',
    slug: 'bob-jones',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@example.com',
    eventDate: '2026-05-19',
    ticketType: 'speaker',
    eventTitle: 'Testing Summit',
    eventDescription: 'Unit tests',
    slug: 'charlie-brown',
  },
];

describe('useAttendeeFilters', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAttendeeFilters(mockAttendees));

    expect(result.current.searchQuery).toBe('');
    expect(result.current.sortConfig).toEqual({ key: 'lastName', direction: 'asc' });
    // Default sort is lastName ASC: Brown, Jones, Smith
    expect(result.current.filteredAndSortedAttendees[0].lastName).toBe('Brown');
    expect(result.current.filteredAndSortedAttendees[1].lastName).toBe('Jones');
    expect(result.current.filteredAndSortedAttendees[2].lastName).toBe('Smith');
  });

  it('should filter attendees based on search query', () => {
    const { result } = renderHook(() => useAttendeeFilters(mockAttendees));

    act(() => {
      result.current.setSearchQuery('Alice');
    });

    expect(result.current.filteredAndSortedAttendees).toHaveLength(1);
    expect(result.current.filteredAndSortedAttendees[0].firstName).toBe('Alice');

    act(() => {
      result.current.setSearchQuery('Vite');
    });

    expect(result.current.filteredAndSortedAttendees).toHaveLength(1);
    expect(result.current.filteredAndSortedAttendees[0].eventTitle).toBe('Vite Day');
  });

  it('should filter attendees based on date range', () => {
    const { result } = renderHook(() => useAttendeeFilters(mockAttendees));

    // Filter by startDate only
    act(() => {
      result.current.setStartDate('2026-05-20');
    });
    expect(result.current.filteredAndSortedAttendees).toHaveLength(2); // Alice (20th), Bob (21st)
    expect(result.current.filteredAndSortedAttendees.map((a) => a.firstName)).toContain('Alice');
    expect(result.current.filteredAndSortedAttendees.map((a) => a.firstName)).toContain('Bob');

    // Filter by endDate only
    act(() => {
      result.current.setStartDate('');
      result.current.setEndDate('2026-05-20');
    });
    expect(result.current.filteredAndSortedAttendees).toHaveLength(2); // Charlie (19th), Alice (20th)
    expect(result.current.filteredAndSortedAttendees.map((a) => a.firstName)).toContain('Charlie');
    expect(result.current.filteredAndSortedAttendees.map((a) => a.firstName)).toContain('Alice');

    // Filter by both startDate and endDate
    act(() => {
      result.current.setStartDate('2026-05-20');
      result.current.setEndDate('2026-05-20');
    });
    expect(result.current.filteredAndSortedAttendees).toHaveLength(1); // Alice (20th)
    expect(result.current.filteredAndSortedAttendees[0].firstName).toBe('Alice');

    // Range with no matches
    act(() => {
      result.current.setStartDate('2026-06-01');
      result.current.setEndDate('2026-06-30');
    });
    expect(result.current.filteredAndSortedAttendees).toHaveLength(0);
  });

  it('should sort attendees when handleSort is called', () => {
    const { result } = renderHook(() => useAttendeeFilters(mockAttendees));

    // Sort by firstName ASC
    act(() => {
      result.current.handleSort('firstName');
    });
    expect(result.current.sortConfig).toEqual({ key: 'firstName', direction: 'asc' });
    expect(result.current.filteredAndSortedAttendees[0].firstName).toBe('Alice');
    expect(result.current.filteredAndSortedAttendees[1].firstName).toBe('Bob');
    expect(result.current.filteredAndSortedAttendees[2].firstName).toBe('Charlie');

    // Sort by firstName DESC
    act(() => {
      result.current.handleSort('firstName');
    });
    expect(result.current.sortConfig).toEqual({ key: 'firstName', direction: 'desc' });
    expect(result.current.filteredAndSortedAttendees[0].firstName).toBe('Charlie');
    expect(result.current.filteredAndSortedAttendees[1].firstName).toBe('Bob');
    expect(result.current.filteredAndSortedAttendees[2].firstName).toBe('Alice');
  });

  it('should handle empty search results', () => {
    const { result } = renderHook(() => useAttendeeFilters(mockAttendees));

    act(() => {
      result.current.setSearchQuery('NonExistent');
    });

    expect(result.current.filteredAndSortedAttendees).toHaveLength(0);
  });

  it('should clear all filters and reset sort when clearFilters is called', () => {
    const { result } = renderHook(() => useAttendeeFilters(mockAttendees));

    act(() => {
      result.current.setSearchQuery('Alice');
      result.current.setStartDate('2026-05-20');
      result.current.setEndDate('2026-05-21');
      result.current.handleSort('firstName');
    });

    expect(result.current.searchQuery).toBe('Alice');
    expect(result.current.startDate).toBe('2026-05-20');
    expect(result.current.endDate).toBe('2026-05-21');
    expect(result.current.sortConfig?.key).toBe('firstName');

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.searchQuery).toBe('');
    expect(result.current.startDate).toBe('');
    expect(result.current.endDate).toBe('');
    expect(result.current.sortConfig).toEqual({ key: 'lastName', direction: 'asc' });
    expect(result.current.filteredAndSortedAttendees).toHaveLength(3);
  });
});
