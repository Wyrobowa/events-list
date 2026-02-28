import { useEffect, ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Box, Button, Select, Textarea } from 'tharaday';

import {
  editAttendeeForm,
  clearAttendeeForm,
  resetStatus,
  setAttendeeForm,
  submitAttendeeForm,
  setSuccessStatus,
} from '../../store/slices/attendeeSlice';
import { updateAttendee, deleteAttendee } from '../../store/slices/attendeeListSlice';
import Alert from '../../components/alert/Alert';
import InputFormField from '../../components/inputFormField/InputFormField';
import { RootState, Attendee } from '../../types';
import { AppDispatch } from '../../configureStore';
import { PlusIcon, SaveIcon, TrashIcon } from '../../components/icons/Icons';
import DeleteConfirmationModal from '../../components/deleteConfirmationModal/DeleteConfirmationModal';

const schema = yup.object().shape({
  firstName: yup.string().required("First Name field can't be empty!"),
  lastName: yup.string().required("Last Name field can't be empty!"),
  email: yup.string().email('Please enter a valid email!').required("Email field can't be empty!"),
  eventDate: yup.date().required("Event Date field can't be empty!"),
  ticketType: yup
    .string()
    .oneOf(['standard', 'vip', 'speaker'])
    .required("Ticket Type field can't be empty!"),
  eventTitle: yup.string().required("Event Title field can't be empty!"),
  eventDescription: yup.string().required("Event Description field can't be empty!"),
});

interface AttendeeFormProps {
  slug?: string;
  onSuccess?: () => void;
}

const AttendeeForm = ({ slug, onSuccess }: AttendeeFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { status, msg, formValidationErrors, attendeeForm } = useSelector(
    (state: RootState) => state.attendee,
  );
  const { attendeeList } = useSelector((state: RootState) => state.attendeeList);

  useEffect(() => {
    if (status === 'success') {
      if (onSuccess) onSuccess();
      dispatch(resetStatus());
    }
  }, [status, onSuccess, dispatch]);

  useEffect(() => {
    if (slug) {
      const attendeeToEdit = attendeeList.find((a: Attendee) => a.slug === slug);
      if (attendeeToEdit) {
        dispatch(setAttendeeForm(attendeeToEdit));
      }
    } else {
      dispatch(clearAttendeeForm());
    }
  }, [dispatch, slug, attendeeList]);

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    dispatch(editAttendeeForm({ field: name, value }));
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (slug) {
      // For editing, we update local state and clear the form
      dispatch(updateAttendee(attendeeForm));
      dispatch(clearAttendeeForm());
      dispatch(setSuccessStatus());
    } else {
      dispatch(submitAttendeeForm({ schema, attendeeForm }));
    }
  };

  const handleCancel = () => {
    dispatch(clearAttendeeForm());
    if (onSuccess) onSuccess();
  };

  const handleDelete = () => {
    if (slug) {
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (slug) {
      dispatch(deleteAttendee(slug));
      dispatch(clearAttendeeForm());
      setIsDeleteModalOpen(false);
      if (onSuccess) onSuccess();
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Box padding={2}>
      <div className="container">
        {status !== 'initial' && (
          <Alert type={status} msg={msg}>
            {formValidationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </Alert>
        )}
        <form>
          <InputFormField
            label="First Name"
            id="firstName"
            onChange={handleInputChange}
            value={attendeeForm.firstName}
          />
          <InputFormField
            label="Last Name"
            id="lastName"
            onChange={handleInputChange}
            value={attendeeForm.lastName}
          />
          <InputFormField
            label="Email"
            id="email"
            type="email"
            onChange={handleInputChange}
            value={attendeeForm.email}
          />
          <InputFormField
            label="Event Date"
            id="eventDate"
            type="date"
            onChange={handleInputChange}
            value={attendeeForm.eventDate}
          />
          <InputFormField
            label="Event Title"
            id="eventTitle"
            onChange={handleInputChange}
            value={attendeeForm.eventTitle}
          />

          <Box mb={4}>
            <Textarea
              label="Event Description"
              id="eventDescription"
              onChange={handleInputChange}
              value={attendeeForm.eventDescription}
              fullWidth
            />
          </Box>

          <Box mb={4}>
            <Select
              label="Ticket Type"
              name="ticketType"
              value={attendeeForm.ticketType}
              onChange={handleInputChange}
              options={[
                { value: 'standard', label: 'Standard' },
                { value: 'vip', label: 'VIP' },
                { value: 'speaker', label: 'Speaker' },
              ]}
              fullWidth
            />
          </Box>
          <Box display="flex" gap={2}>
            <Button type="submit" onClick={handleSubmit} intent="success" variant="solid" fullWidth>
              <Box display="flex" alignItems="center" gap={1}>
                {slug ? (
                  <>
                    <SaveIcon size={16} />
                    Save
                  </>
                ) : (
                  <>
                    <PlusIcon size={16} />
                    Add
                  </>
                )}
              </Box>
            </Button>
            <Button type="button" onClick={handleCancel} intent="neutral" variant="solid" fullWidth>
              Cancel
            </Button>
            {slug && (
              <Button
                type="button"
                onClick={handleDelete}
                intent="danger"
                variant="solid"
                fullWidth
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <TrashIcon size={16} />
                  Delete
                </Box>
              </Button>
            )}
          </Box>
        </form>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default AttendeeForm;
