import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../configureStore';
import { deleteAttendee, deleteMultipleAttendees, clearAllAttendees } from '../../../store/slices/attendeeListSlice';

interface UseAttendeeModalsProps {
  selectedSlugs: string[];
  setSelectedSlugs: (slugs: string[]) => void;
}

export const useAttendeeModals = ({ selectedSlugs, setSelectedSlugs }: UseAttendeeModalsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  const [editingSlug, setEditingSlug] = useState<string | undefined>(undefined);
  const [slugToDelete, setSlugToDelete] = useState<string | undefined>(undefined);

  // Add/Edit Modal
  const handleAdd = useCallback(() => {
    setEditingSlug(undefined);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((slug: string) => {
    setEditingSlug(slug);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingSlug(undefined);
  }, []);

  // Single Delete
  const handleDeleteClick = useCallback((slug: string) => {
    setSlugToDelete(slug);
    setIsDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (slugToDelete) {
      dispatch(deleteAttendee(slugToDelete));
      setIsDeleteModalOpen(false);
      setSlugToDelete(undefined);
    }
  }, [dispatch, slugToDelete]);

  const cancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSlugToDelete(undefined);
  }, []);

  // Clear All
  const handleClearAll = useCallback(() => {
    setIsClearAllModalOpen(true);
  }, []);

  const confirmClearAll = useCallback(() => {
    dispatch(clearAllAttendees());
    setIsClearAllModalOpen(false);
  }, [dispatch]);

  const cancelClearAll = useCallback(() => {
    setIsClearAllModalOpen(false);
  }, []);

  // Bulk Delete
  const handleBulkDelete = useCallback(() => {
    setIsBulkDeleteModalOpen(true);
  }, []);

  const confirmBulkDelete = useCallback(() => {
    dispatch(deleteMultipleAttendees(selectedSlugs));
    setSelectedSlugs([]);
    setIsBulkDeleteModalOpen(false);
  }, [dispatch, selectedSlugs, setSelectedSlugs]);

  const cancelBulkDelete = useCallback(() => {
    setIsBulkDeleteModalOpen(false);
  }, []);

  return {
    isModalOpen,
    isDeleteModalOpen,
    isClearAllModalOpen,
    isBulkDeleteModalOpen,
    editingSlug,
    selectedSlugsCount: selectedSlugs.length,
    handlers: {
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
    },
  };
};
