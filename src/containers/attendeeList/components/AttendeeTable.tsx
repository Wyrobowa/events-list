import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Box,
  Button,
} from 'tharaday';
import { Attendee } from '../../../types';
import { EditIcon, TrashIcon } from '../../../components/icons/Icons';

interface AttendeeTableProps {
  attendees: Attendee[];
  sortConfig: { key: keyof Attendee; direction: 'asc' | 'desc' } | null;
  onSort: (key: keyof Attendee) => void;
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
}

const AttendeeTable = ({
  attendees,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}: AttendeeTableProps) => {
  return (
    <Table striped hoverable>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('firstName')}>
            <Box display="flex" alignItems="center" gap={1}>
              First Name {sortConfig?.key === 'firstName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </Box>
          </TableHead>
          <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('lastName')}>
            <Box display="flex" alignItems="center" gap={1}>
              Last Name {sortConfig?.key === 'lastName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </Box>
          </TableHead>
          <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('email')}>
            <Box display="flex" alignItems="center" gap={1}>
              Email {sortConfig?.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </Box>
          </TableHead>
          <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('eventDate')}>
            <Box display="flex" alignItems="center" gap={1}>
              Event Date {sortConfig?.key === 'eventDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </Box>
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendees.map((attendee: Attendee, index: number) => (
          <TableRow key={attendee.slug}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{attendee.firstName}</TableCell>
            <TableCell>{attendee.lastName}</TableCell>
            <TableCell>{attendee.email}</TableCell>
            <TableCell>{dayjs(attendee.eventDate).format('YYYY-MM-DD')}</TableCell>
            <TableCell>
              <Box display="flex" gap={2}>
                <Button size="sm" intent="success" onClick={() => attendee.slug && onEdit(attendee.slug)}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EditIcon size={14} />
                    Edit
                  </Box>
                </Button>
                <Button size="sm" intent="danger" onClick={() => attendee.slug && onDelete(attendee.slug)}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TrashIcon size={14} />
                    Delete
                  </Box>
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendeeTable;
