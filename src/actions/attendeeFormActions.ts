import { Attendee } from '../types';
import { AppDispatch } from '../configureStore';

export const SEND_ATTENDEE_FORM_SUCCESSFUL = 'SEND_ATTENDEE_FORM_SUCCESSFUL';
export const SEND_ATTENDEE_FORM_UNSUCCESSFUL = 'SEND_ATTENDEE_FORM_UNSUCCESSFUL';
export const EDIT_ATTENDEE_FORM = 'EDIT_ATTENDEE_FORM';
export const CLEAR_ATTENDEE_FORM = 'CLEAR_ATTENDEE_FORM';
export const RESET_STATUS = 'RESET_STATUS';
export const FORM_VALIDATION_ERRORS = 'FORM_VALIDATION_ERRORS';

export const sendAttendeeFormSuccessful = () => ({
  type: SEND_ATTENDEE_FORM_SUCCESSFUL,
});

export const sendAttendeeFormUnsuccessful = () => ({
  type: SEND_ATTENDEE_FORM_UNSUCCESSFUL,
});

export const clearAttendeeForm = () => ({
  type: CLEAR_ATTENDEE_FORM,
});

export const resetStatus = () => ({
  type: RESET_STATUS,
});

export const formValidationErrors = (errors: string[]) => ({
  type: FORM_VALIDATION_ERRORS,
  errors,
});

export const sendAttendeeForm = (schema: any, attendeeForm: Attendee, ref: React.RefObject<HTMLButtonElement | null>) => async (dispatch: AppDispatch) => {
  try {
    await schema.validate(attendeeForm, { abortEarly: false });

    try {
      const response = await fetch('http://localhost:3001/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendeeForm),
      });

      await response.json();

      if (response.status !== 200) {
        throw new Error();
      }

      dispatch(clearAttendeeForm());
      dispatch(sendAttendeeFormSuccessful());
    } catch (error) {
      dispatch(sendAttendeeFormUnsuccessful());
    }
  } catch (error: any) {
    const errors = error.inner.map((item: any) => (item.message));

    dispatch(formValidationErrors(errors));
  } finally {
    ref.current?.removeAttribute('disabled');
  }
};

export const editAttendeeForm = (field: string, value: string) => ({
  type: EDIT_ATTENDEE_FORM,
  field,
  value,
});
