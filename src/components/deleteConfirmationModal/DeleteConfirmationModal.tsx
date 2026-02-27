import { Box, Text, Button, Modal } from 'tharaday';
import { TrashIcon } from '../icons/Icons';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this attendee?',
  confirmText = 'Delete',
}: DeleteConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
    >
      <Box display="flex" flexDirection="column" gap={4} padding={2}>
        <Box mb={4}>
          <Text align="center">{message}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button onClick={onConfirm} intent="danger" variant="solid">
            <Box display="flex" alignItems="center" gap={1}>
              <TrashIcon size={16} />
              {confirmText}
            </Box>
          </Button>
          <Button onClick={onClose} variant="solid">Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
