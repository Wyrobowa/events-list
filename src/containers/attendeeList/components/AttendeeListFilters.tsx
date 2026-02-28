import { Box, Input, Select, Text, Button } from 'tharaday';
import { Attendee } from '../../../types';

interface AttendeeListFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
  sortKey: keyof Attendee | '';
  onSort: (key: keyof Attendee) => void;
  onClearFilters: () => void;
}

const AttendeeListFilters = ({
  searchQuery,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  sortKey,
  onSort,
  onClearFilters,
}: AttendeeListFiltersProps) => {
  return (
    <Box
      mb={4}
      display="flex"
      gap={6}
      alignItems="flex-end"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Box display="flex" gap={6} alignItems="flex-end">
        <Box width="200px">
          <Input
            placeholder="Search attendees..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            fullWidth
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box width="150px">
            <Input
              label="From"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              fullWidth
            />
          </Box>
          <Box width="150px">
            <Input
              label="To"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>
        <Box width="200px">
          <Select
            label="Sort by"
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
      <Box>
        <Button onClick={onClearFilters} variant="outline" intent="neutral">
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default AttendeeListFilters;
