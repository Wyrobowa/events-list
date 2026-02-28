import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Attendee } from '../types';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useAttendeeFilters = (attendees: Attendee[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Attendee;
    direction: 'asc' | 'desc';
  } | null>({ key: 'lastName', direction: 'asc' });

  const handleSort = (key: keyof Attendee) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedAttendees = useMemo(() => {
    return [...attendees]
      .filter((attendee: Attendee) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          attendee.firstName.toLowerCase().includes(searchLower) ||
          attendee.lastName.toLowerCase().includes(searchLower) ||
          attendee.email.toLowerCase().includes(searchLower) ||
          (attendee.eventTitle || '').toLowerCase().includes(searchLower) ||
          (attendee.eventDescription || '').toLowerCase().includes(searchLower) ||
          (attendee.ticketType || '').toLowerCase().includes(searchLower);

        let matchesDate = true;
        if (startDate && endDate) {
          matchesDate = dayjs(attendee.eventDate).isBetween(startDate, endDate, 'day', '[]');
        } else if (startDate) {
          matchesDate = dayjs(attendee.eventDate).isSameOrAfter(startDate, 'day');
        } else if (endDate) {
          matchesDate = dayjs(attendee.eventDate).isSameOrBefore(endDate, 'day');
        }

        return matchesSearch && matchesDate;
      })
      .sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        if (a[key]! < b[key]!) return direction === 'asc' ? -1 : 1;
        if (a[key]! > b[key]!) return direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [attendees, searchQuery, sortConfig, startDate, endDate]);

  const clearFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setSortConfig({ key: 'lastName', direction: 'asc' });
  };

  return {
    searchQuery,
    setSearchQuery,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortConfig,
    handleSort,
    filteredAndSortedAttendees,
    clearFilters,
  };
};
