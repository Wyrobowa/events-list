import { Modal } from 'tharaday';
import AttendeeForm from '../../attendeeForm/AttendeeForm';
import DeleteConfirmationModal from '../../../components/deleteConfirmationModal/DeleteConfirmationModal';

interface AttendeeListModalsProps {
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isClearAllModalOpen: boolean;
  isBulkDeleteModalOpen: boolean;
  editingSlug: string | undefined;
  selectedCount: number;
  onCloseModal: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onConfirmClearAll: () => void;
  onCancelClearAll: () => void;
  onConfirmBulkDelete: () => void;
  onCancelBulkDelete: () => void;
}

const AttendeeListModals = ({
  isModalOpen,
  isDeleteModalOpen,
  isClearAllModalOpen,
  isBulkDeleteModalOpen,
  editingSlug,
  selectedCount,
  onCloseModal,
  onConfirmDelete,
  onCancelDelete,
  onConfirmClearAll,
  onCancelClearAll,
  onConfirmBulkDelete,
  onCancelBulkDelete,
}: AttendeeListModalsProps) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        size="md"
        title={editingSlug ? 'Edit Attendee' : 'Add Attendee'}
      >
        <AttendeeForm slug={editingSlug} onSuccess={onCloseModal} />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      <DeleteConfirmationModal
        isOpen={isClearAllModalOpen}
        onClose={onCancelClearAll}
        onConfirm={onConfirmClearAll}
        title="Confirm Clear All"
        message="Are you sure you want to remove all attendees? This action cannot be undone."
        confirmText="Delete All"
      />

      <DeleteConfirmationModal
        isOpen={isBulkDeleteModalOpen}
        onClose={onCancelBulkDelete}
        onConfirm={onConfirmBulkDelete}
        title="Confirm Bulk Delete"
        message={`Are you sure you want to remove ${selectedCount} selected attendees? This action cannot be undone.`}
        confirmText="Delete Selected"
      />
    </>
  );
};

export default AttendeeListModals;
