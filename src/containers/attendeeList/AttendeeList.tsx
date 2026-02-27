import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Box,
  Button,
  Modal,
} from 'tharaday';

import * as actions from '../../actions/attendeeListActions';
import Alert from '../../components/alert/Alert';
import { RootState, Attendee } from '../../types';
import { AppDispatch } from '../../configureStore';
import AttendeeForm from '../attendeeForm/AttendeeForm';

const AttendeeList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) => state.attendeeList.status);
  const msg = useSelector((state: RootState) => state.attendeeList.msg);
  const attendeeList = useSelector((state: RootState) => state.attendeeList.attendeeList);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(actions.requestAttendeeList());
  }, [dispatch]);

  const handleDelete = (slug?: string) => {
    if (slug) {
      dispatch(actions.deleteAttendee(slug));
    }
  };

  const handleEdit = (slug?: string) => {
    setEditingSlug(slug);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSlug(undefined);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSlug(undefined);
  };

  return (
    <Box padding={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Text variant="h2">Attendees List</Text>
        <Button onClick={handleAdd}>Add Attendee</Button>
      </Box>

      {status !== 'initial' && (
        <Alert type={status} msg={msg} />
      )}
      {status !== 'danger' && attendeeList.length > 0 && (
        <Table striped hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendeeList.map((attendee: Attendee, index: number) => (
              <TableRow key={attendee.slug}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{attendee.firstName}</TableCell>
                <TableCell>{attendee.lastName}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{dayjs(attendee.eventDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>
                  <Box display="flex" gap={2}>
                    <Button size="sm" onClick={() => handleEdit(attendee.slug)}>Edit</Button>
                    <Button size="sm" intent="danger" onClick={() => handleDelete(attendee.slug)}>Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {status !== 'danger' && attendeeList.length === 0 && (
        <Box padding={10}>
          <Text variant="h2" align="center">No Attendees!</Text>
        </Box>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="md"
      >
        <AttendeeForm slug={editingSlug} onSuccess={handleCloseModal} />
      </Modal>
    </Box>
  );
};

export default AttendeeList;
