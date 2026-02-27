import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  Box,
  Button,
  Modal,
  Input,
} from 'tharaday';

import { fetchAttendees, deleteAttendee, clearAllAttendees } from '../../store/slices/attendeeListSlice';
import Alert from '../../components/alert/Alert';
import { RootState } from '../../types';
import { AppDispatch } from '../../configureStore';
import AttendeeForm from '../attendeeForm/AttendeeForm';
import { PlusIcon, TrashIcon } from '../../components/icons/Icons';
import DeleteConfirmationModal from '../../components/deleteConfirmationModal/DeleteConfirmationModal';
import { useAttendeeFilters } from '../../hooks/useAttendeeFilters';
import AttendeeTable from './components/AttendeeTable';

const AttendeeList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, msg, attendeeList } = useSelector((state: RootState) => state.attendeeList);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | undefined>(undefined);
  const [slugToDelete, setSlugToDelete] = useState<string | undefined>(undefined);

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    filteredAndSortedAttendees,
  } = useAttendeeFilters(attendeeList);

  useEffect(() => {
    dispatch(fetchAttendees());
  }, [dispatch]);

  const handleDeleteClick = (slug: string) => {
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

  const handleClearAll = () => {
    setIsClearAllModalOpen(true);
  };

  const confirmClearAll = () => {
    dispatch(clearAllAttendees());
    setIsClearAllModalOpen(false);
  };

  const cancelClearAll = () => {
    setIsClearAllModalOpen(false);
  };

  const handleEdit = (slug: string) => {
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
        <Box display="flex" gap={2}>
          {attendeeList.length > 0 && (
            <Button onClick={handleClearAll} intent="danger" variant="outline">
              <Box display="flex" alignItems="center" gap={1}>
                <TrashIcon size={16} />
                Clear All
              </Box>
            </Button>
          )}
          <Button onClick={handleAdd}>
            <Box display="flex" alignItems="center" gap={1}>
              <PlusIcon size={16} />
              Add Attendee
            </Box>
          </Button>
        </Box>
      </Box>

      {status !== 'initial' && (
        <Alert type={status} msg={msg} />
      )}

      <Box mb={4} width="300px">
        <Input
          placeholder="Search attendees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {status !== 'danger' && filteredAndSortedAttendees.length > 0 && (
        <AttendeeTable
          attendees={filteredAndSortedAttendees}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}
      {status !== 'danger' && attendeeList.length > 0 && filteredAndSortedAttendees.length === 0 && (
        <Box padding={10}>
          <Text variant="h3" align="center">No attendees match your search.</Text>
        </Box>
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />

      <DeleteConfirmationModal
        isOpen={isClearAllModalOpen}
        onClose={cancelClearAll}
        onConfirm={confirmClearAll}
        title="Confirm Clear All"
        message="Are you sure you want to remove all attendees? This action cannot be undone."
        confirmText="Delete All"
      />
    </Box>
  );
};

export default AttendeeList;
