import { useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import * as actions from '../../actions/attendeeFormActions';
import Alert from '../../components/alert/Alert';
import Button from '../../components/button/Button';
import InputFormField from '../../components/inputFormField/InputFormField';
import { RootState } from '../../types';
import { AppDispatch } from '../../configureStore';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name field can\'t be empty!'),
  lastName: yup.string().required('Last Name field can\'t be empty!'),
  email: yup.string().email('Please enter a valid email!').required('Email field can\'t be empty!'),
  eventDate: yup.date().required('Event Date field can\'t be empty!'),
});

const AttendeeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const status = useSelector((state: RootState) => state.attendee.status);
  const msg = useSelector((state: RootState) => state.attendee.msg);
  const formValidationErrors = useSelector((state: RootState) => state.attendee.formValidationErrors);
  const attendeeForm = useSelector((state: RootState) => state.attendee.attendeeForm);

  useEffect(() => {
    dispatch(actions.clearAttendeeForm());
  }, [dispatch]);

  const submitButton = useRef<HTMLButtonElement>(null);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    dispatch(actions.editAttendeeForm(name, value));
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (submitButton.current) {
      submitButton.current.setAttribute('disabled', 'true');
    }

    dispatch(actions.sendAttendeeForm(schema, attendeeForm, submitButton));
  };

  return (
    <div className="container">
      {status !== 'initial' && (
        <Alert type={status} msg={msg}>
          {formValidationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </Alert>
      )}
      <div className="container col-md-4 mt-3">
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
            text="Add"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
            ref={submitButton}
          />
        </form>
      </div>
    </div>
  );
};

export default AttendeeForm;
