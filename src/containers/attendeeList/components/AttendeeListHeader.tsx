import { Box, Text, Button } from 'tharaday';
import { PlusIcon, TrashIcon, DownloadIcon } from '../../../components/icons/Icons';

interface AttendeeListHeaderProps {
  attendeeCount: number;
  selectedCount: number;
  filteredCount: number;
  onClearAll: () => void;
  onBulkDelete: () => void;
  onExportCSV: () => void;
  onAdd: () => void;
}

const AttendeeListHeader = ({
  attendeeCount,
  selectedCount,
  filteredCount,
  onClearAll,
  onBulkDelete,
  onExportCSV,
  onAdd,
}: AttendeeListHeaderProps) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <Text variant="h2">Attendees List</Text>
      <Box display="flex" gap={2}>
        {attendeeCount > 0 && (
          <Button onClick={onClearAll} intent="danger" variant="outline">
            <Box display="flex" alignItems="center" gap={1}>
              <TrashIcon size={16} />
              Delete All
            </Box>
          </Button>
        )}
        {selectedCount > 0 && (
          <Button onClick={onBulkDelete} intent="danger" variant="solid">
            <Box display="flex" alignItems="center" gap={1}>
              <TrashIcon size={16} />
              Delete Selected ({selectedCount})
            </Box>
          </Button>
        )}
        {filteredCount > 0 && (
          <Button onClick={onExportCSV} variant="outline" intent="info">
            <Box display="flex" alignItems="center" gap={1}>
              <DownloadIcon size={16} />
              Export CSV
            </Box>
          </Button>
        )}
        <Button onClick={onAdd}>
          <Box display="flex" alignItems="center" gap={1}>
            <PlusIcon size={16} />
            Add Attendee
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default AttendeeListHeader;
