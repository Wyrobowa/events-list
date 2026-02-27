import { useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Box, Text } from 'tharaday';

import * as formActions from '../../actions/attendeeFormActions';
import * as listActions from '../../actions/attendeeListActions';
import Alert from '../../components/alert/Alert';
import Button from '../../components/button/Button';
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
  
  const status = useSelector((state: RootState) => state.attendee.status);
  const msg = useSelector((state: RootState) => state.attendee.msg);
  const formValidationErrors = useSelector((state: RootState) => state.attendee.formValidationErrors);
  const attendeeForm = useSelector((state: RootState) => state.attendee.attendeeForm);
  const attendeeList = useSelector((state: RootState) => state.attendeeList.attendeeList);

  useEffect(() => {
    if (status === 'success') {
      if (onSuccess) onSuccess();
      dispatch(formActions.resetStatus());
    }
  }, [status, onSuccess, dispatch]);

  useEffect(() => {
    if (slug) {
      const attendeeToEdit = attendeeList.find((a: Attendee) => a.slug === slug);
      if (attendeeToEdit) {
        dispatch(formActions.setAttendeeForm(attendeeToEdit));
      }
    } else {
      dispatch(formActions.clearAttendeeForm());
    }
  }, [dispatch, slug, attendeeList]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    dispatch(formActions.editAttendeeForm(name, value));
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (slug) {
      // For editing, we update local state and clear the form
      dispatch(listActions.updateAttendee(attendeeForm));
      dispatch(formActions.clearAttendeeForm());
      dispatch(formActions.sendAttendeeFormSuccessful());
    } else {
      dispatch(formActions.sendAttendeeForm(schema, attendeeForm));
    }
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
        <Box padding={4} style={{ margin: '0 auto' }}>
          <Text variant="h3" align="center" style={{ marginBottom: '1rem' }}>
            {slug ? 'Edit Attendee' : 'Add Attendee'}
          </Text>
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
            <Button
              type="submit"
              text={slug ? 'Save' : 'Add'}
              onClick={handleSubmit}
              className="btn btn-primary btn-block"
            />
          </form>
        </Box>
      </div>
    </Box>
  );
};

export default AttendeeForm;
