import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  Box,
  Button,
  Modal,
  Input,
} from 'tharaday';

import { fetchAttendees } from '../../store/slices/attendeeListSlice';
import Alert from '../../components/alert/Alert';
import { RootState } from '../../types';
import { AppDispatch } from '../../configureStore';
import AttendeeForm from '../attendeeForm/AttendeeForm';
import { PlusIcon, TrashIcon, DownloadIcon } from '../../components/icons/Icons';
import DeleteConfirmationModal from '../../components/deleteConfirmationModal/DeleteConfirmationModal';
import { useAttendeeFilters } from '../../hooks/useAttendeeFilters';
import AttendeeTable from './components/AttendeeTable';
import { useAttendeeModals } from './hooks/useAttendeeModals';
import { exportAttendeesToCSV } from '../../utils/csvExport';

const AttendeeList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, msg, attendeeList } = useSelector((state: RootState) => state.attendeeList);

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    filteredAndSortedAttendees,
  } = useAttendeeFilters(attendeeList);

  const {
    isModalOpen,
    isDeleteModalOpen,
    isClearAllModalOpen,
    isBulkDeleteModalOpen,
    editingSlug,
    handlers,
  } = useAttendeeModals({
    selectedSlugs,
    setSelectedSlugs,
  });

  const {
    handleAdd,
    handleEdit,
    handleCloseModal,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    handleClearAll,
    confirmClearAll,
    cancelClearAll,
    handleBulkDelete,
    confirmBulkDelete,
    cancelBulkDelete,
  } = handlers;

  useEffect(() => {
    dispatch(fetchAttendees());
  }, [dispatch]);

  const handleSelectAttendee = useCallback((slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const handleSelectAllAttendees = useCallback(() => {
    if (selectedSlugs.length === filteredAndSortedAttendees.length) {
      setSelectedSlugs([]);
    } else {
      setSelectedSlugs(filteredAndSortedAttendees.map((a) => a.slug || ''));
    }
  }, [selectedSlugs.length, filteredAndSortedAttendees]);

  const handleExportCSV = useCallback(() => {
    exportAttendeesToCSV(filteredAndSortedAttendees);
  }, [filteredAndSortedAttendees]);

  return (
    <Box padding={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Text variant="h2">Attendees List</Text>
        <Box display="flex" gap={2}>
          {attendeeList.length > 0 && (
            <Button onClick={handleClearAll} intent="danger" variant="outline">
              <Box display="flex" alignItems="center" gap={1}>
                <TrashIcon size={16} />
                Delete All
              </Box>
            </Button>
          )}
          {selectedSlugs.length > 0 && (
            <Button onClick={handleBulkDelete} intent="danger" variant="solid">
              <Box display="flex" alignItems="center" gap={1}>
                <TrashIcon size={16} />
                Delete Selected ({selectedSlugs.length})
              </Box>
            </Button>
          )}
          {filteredAndSortedAttendees.length > 0 && (
            <Button onClick={handleExportCSV} variant="outline" intent="info">
              <Box display="flex" alignItems="center" gap={1}>
                <DownloadIcon size={16} />
                Export CSV
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
          selectedSlugs={selectedSlugs}
          onSelect={handleSelectAttendee}
          onSelectAll={handleSelectAllAttendees}
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

      <DeleteConfirmationModal
        isOpen={isBulkDeleteModalOpen}
        onClose={cancelBulkDelete}
        onConfirm={confirmBulkDelete}
        title="Confirm Bulk Delete"
        message={`Are you sure you want to remove ${selectedSlugs.length} selected attendees? This action cannot be undone.`}
        confirmText="Delete Selected"
      />
    </Box>
  );
};

export default AttendeeList;
