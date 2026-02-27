import { useEffect, ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Box, Text, Button, Modal } from 'tharaday';

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

const schema = yup.object().shape({
  firstName: yup.string().required('First Name field can\'t be empty!'),
  lastName: yup.string().required('Last Name field can\'t be empty!'),
  email: yup.string().email('Please enter a valid email!').required('Email field can\'t be empty!'),
  eventDate: yup.date().required('Event Date field can\'t be empty!'),
});

interface AttendeeFormProps {
  slug?: string;
  onSuccess?: () => void;
}

const AttendeeForm = ({ slug, onSuccess }: AttendeeFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { status, msg, formValidationErrors, attendeeForm } = useSelector((state: RootState) => state.attendee);
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

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
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
          <Box display="flex" gap={2}>
            <Button
              type="submit"
              onClick={handleSubmit}
              intent="success"
              variant="solid"
              fullWidth
            >
              <Box display="flex" alignItems="center" gap={1}>
                {slug ? (
                  <>
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
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    Save
                  </>
                ) : (
                  <>
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
                    Add
                  </>
                )}
              </Box>
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              intent="neutral"
              variant="solid"
              fullWidth
            >
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
            )}
          </Box>
        </form>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        size="sm"
        title="Confirm Deletion"
      >
        <Box padding={6}>
          <Text align="center">Are you sure you want to delete this attendee?</Text>
          <Box display="flex" gap={4} justifyContent="center">
            <Button onClick={confirmDelete} intent="danger">
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
            <Button onClick={cancelDelete} intent="neutral" variant="outline">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AttendeeForm;
