import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  Box,
} from 'tharaday';

import { fetchAttendees } from '../../store/slices/attendeeListSlice';
import Alert from '../../components/alert/Alert';
import { RootState, Attendee } from '../../types';
import { AppDispatch } from '../../configureStore';
import { useAttendeeFilters } from '../../hooks/useAttendeeFilters';
import AttendeeTable from './components/AttendeeTable';
import { useAttendeeModals } from './hooks/useAttendeeModals';
import { exportAttendeesToCSV } from '../../utils/csvExport';
import AttendeeListHeader from './components/AttendeeListHeader';
import AttendeeListFilters from './components/AttendeeListFilters';
import AttendeeListModals from './components/AttendeeListModals';

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
      <AttendeeListHeader
        attendeeCount={attendeeList.length}
        selectedCount={selectedSlugs.length}
        filteredCount={filteredAndSortedAttendees.length}
        onClearAll={handleClearAll}
        onBulkDelete={handleBulkDelete}
        onExportCSV={handleExportCSV}
        onAdd={handleAdd}
      />

      {status !== 'initial' && (
        <Alert type={status} msg={msg} />
      )}

      <AttendeeListFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortKey={sortConfig?.key || ''}
        onSort={handleSort}
      />

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
          onRowClick={handleEdit}
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

      <AttendeeListModals
        isModalOpen={isModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        isClearAllModalOpen={isClearAllModalOpen}
        isBulkDeleteModalOpen={isBulkDeleteModalOpen}
        editingSlug={editingSlug}
        selectedCount={selectedSlugs.length}
        onCloseModal={handleCloseModal}
        onConfirmDelete={confirmDelete}
        onCancelDelete={cancelDelete}
        onConfirmClearAll={confirmClearAll}
        onCancelClearAll={cancelClearAll}
        onConfirmBulkDelete={confirmBulkDelete}
        onCancelBulkDelete={cancelBulkDelete}
      />
    </Box>
  );
};

export default AttendeeList;
