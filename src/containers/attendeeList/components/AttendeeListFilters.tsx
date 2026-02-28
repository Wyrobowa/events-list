import { Box, Input, Select } from 'tharaday';
import { Attendee } from '../../../types';

interface AttendeeListFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortKey: keyof Attendee | '';
  onSort: (key: keyof Attendee) => void;
}

const AttendeeListFilters = ({
  searchQuery,
  onSearchChange,
  sortKey,
  onSort,
}: AttendeeListFiltersProps) => {
  return (
    <Box mb={4} display="flex" gap={2} alignItems="center">
      <Box width="200px">
        <Input
          placeholder="Search attendees..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
        />
      </Box>
      <Box width="200px">
        <Select
          name="sortBy"
          value={sortKey}
          onChange={(e) => onSort(e.target.value as keyof Attendee)}
          options={[
            { value: 'firstName', label: 'First Name' },
            { value: 'lastName', label: 'Last Name' },
            { value: 'email', label: 'Email' },
            { value: 'eventDate', label: 'Event Date' },
            { value: 'eventTitle', label: 'Event Title' },
            { value: 'ticketType', label: 'Ticket Type' },
          ]}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default AttendeeListFilters;
