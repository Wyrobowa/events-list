import { useState, useMemo } from 'react';
import { Attendee } from '../types';

export const useAttendeeFilters = (attendees: Attendee[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Attendee; direction: 'asc' | 'desc' } | null>(null);

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
        return (
          attendee.firstName.toLowerCase().includes(searchLower) ||
          attendee.lastName.toLowerCase().includes(searchLower) ||
          attendee.email.toLowerCase().includes(searchLower) ||
          (attendee.eventTitle || '').toLowerCase().includes(searchLower) ||
          (attendee.eventDescription || '').toLowerCase().includes(searchLower) ||
          (attendee.ticketType || '').toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        if (a[key]! < b[key]!) return direction === 'asc' ? -1 : 1;
        if (a[key]! > b[key]!) return direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [attendees, searchQuery, sortConfig]);

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    filteredAndSortedAttendees,
  };
};
