import { memo } from 'react';
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
  Badge,
  Checkbox,
} from 'tharaday';
import { Attendee } from '../../../types';
import { EditIcon, TrashIcon } from '../../../components/icons/Icons';

interface AttendeeTableProps {
  attendees: Attendee[];
  sortConfig: { key: keyof Attendee; direction: 'asc' | 'desc' } | null;
  onSort: (key: keyof Attendee) => void;
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
  selectedSlugs: string[];
  onSelect: (slug: string) => void;
  onSelectAll: () => void;
  onRowClick: (slug: string) => void;
}

const AttendeeTable = memo(
  ({
    attendees,
    sortConfig,
    onSort,
    onEdit,
    onDelete,
    selectedSlugs,
    onSelect,
    onSelectAll,
    onRowClick,
  }: AttendeeTableProps) => {
    const allSelected = attendees.length > 0 && selectedSlugs.length === attendees.length;

    return (
      <Table striped hoverable>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox checked={allSelected} onChange={onSelectAll} />
            </TableHead>
            <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('firstName')}>
              <Box display="flex" alignItems="center" gap={1}>
                First Name{' '}
                {sortConfig?.key === 'firstName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </Box>
            </TableHead>
            <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('lastName')}>
              <Box display="flex" alignItems="center" gap={1}>
                Last Name{' '}
                {sortConfig?.key === 'lastName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </Box>
            </TableHead>
            <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('eventTitle')}>
              <Box display="flex" alignItems="center" gap={1}>
                Event Title{' '}
                {sortConfig?.key === 'eventTitle' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </Box>
            </TableHead>
            <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('email')}>
              <Box display="flex" alignItems="center" gap={1}>
                Email {sortConfig?.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </Box>
            </TableHead>
            <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('eventDate')}>
              <Box display="flex" alignItems="center" gap={1}>
                Event Date{' '}
                {sortConfig?.key === 'eventDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </Box>
            </TableHead>
            <TableHead style={{ cursor: 'pointer' }} onClick={() => onSort('ticketType')}>
              <Box display="flex" alignItems="center" gap={1}>
                Ticket Type{' '}
                {sortConfig?.key === 'ticketType' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </Box>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.map((attendee: Attendee, index: number) => {
            const ticketType = attendee.ticketType || 'standard';
            return (
              <TableRow
                key={attendee.slug}
                style={{ cursor: 'pointer' }}
                onClick={() => attendee.slug && onRowClick(attendee.slug)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={attendee.slug ? selectedSlugs.includes(attendee.slug) : false}
                    onChange={() => attendee.slug && onSelect(attendee.slug)}
                  />
                </TableCell>
                <TableCell>{attendee.firstName}</TableCell>
                <TableCell>{attendee.lastName}</TableCell>
                <TableCell>{attendee.eventTitle}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{dayjs(attendee.eventDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>
                  <Badge
                    intent={
                      ticketType === 'vip'
                        ? 'warning'
                        : ticketType === 'speaker'
                          ? 'info'
                          : 'neutral'
                    }
                  >
                    {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  },
);

export default AttendeeTable;
