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

import { fetchAttendees, deleteAttendee } from '../../store/slices/attendeeListSlice';
import Alert from '../../components/alert/Alert';
import { RootState, Attendee } from '../../types';
import { AppDispatch } from '../../configureStore';
import AttendeeForm from '../attendeeForm/AttendeeForm';

const AttendeeList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, msg, attendeeList } = useSelector((state: RootState) => state.attendeeList);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | undefined>(undefined);
  const [slugToDelete, setSlugToDelete] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchAttendees());
  }, [dispatch]);

  const handleDeleteClick = (slug?: string) => {
    setSlugToDelete(slug);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (slugToDelete) {
      dispatch(deleteAttendee(slugToDelete));
      setIsDeleteModalOpen(false);
      setSlugToDelete(undefined);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSlugToDelete(undefined);
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
        <Button onClick={handleAdd}>
          <Box display="flex" alignItems="center" gap={1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Attendee
          </Box>
        </Button>
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
                    <Button size="sm" intent="success" onClick={() => handleEdit(attendee.slug)}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </Box>
                    </Button>
                    <Button size="sm" intent="danger" onClick={() => handleDeleteClick(attendee.slug)}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </Box>
                    </Button>
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
        title={editingSlug ? 'Edit Attendee' : 'Add Attendee'}
      >
        <AttendeeForm slug={editingSlug} onSuccess={handleCloseModal} />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        size="sm"
        title="Confirm Deletion"
      >
        <Box display="flex" flexDirection="column" gap={4} padding={2}>
          <Text align="center">Are you sure you want to delete this attendee?</Text>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button onClick={confirmDelete} intent="danger" variant="solid">
              <Box display="flex" alignItems="center" gap={1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </Box>
            </Button>
            <Button onClick={cancelDelete} variant="solid">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AttendeeList;
