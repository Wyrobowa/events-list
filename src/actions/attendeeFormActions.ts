import { Attendee } from '../types';
import { AppDispatch } from '../configureStore';
import * as listActions from './attendeeListActions';

export const SEND_ATTENDEE_FORM_SUCCESSFUL = 'SEND_ATTENDEE_FORM_SUCCESSFUL';
export const SEND_ATTENDEE_FORM_UNSUCCESSFUL = 'SEND_ATTENDEE_FORM_UNSUCCESSFUL';
export const EDIT_ATTENDEE_FORM = 'EDIT_ATTENDEE_FORM';
export const SET_ATTENDEE_FORM = 'SET_ATTENDEE_FORM';
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

export const sendAttendeeForm = (schema: any, attendeeForm: Attendee) => async (dispatch: AppDispatch) => {
  try {
    await schema.validate(attendeeForm, { abortEarly: false });

    try {
      // jsonplaceholder expects { title: string, body: string, userId: number }
      // we map firstName and lastName to title for consistency with requestAttendeeList
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `${attendeeForm.firstName} ${attendeeForm.lastName}`,
          body: attendeeForm.email,
          userId: 1,
        }),
      });

      const json = await response.json();

      if (response.status !== 200 && response.status !== 201) {
        throw new Error();
      }

      dispatch(listActions.addAttendee({
        ...attendeeForm,
        slug: attendeeForm.slug || `attendee-${json.id || Date.now()}`,
      }));
      dispatch(clearAttendeeForm());
      dispatch(sendAttendeeFormSuccessful());
    } catch (error) {
      dispatch(sendAttendeeFormUnsuccessful());
    }
  } catch (error: any) {
    const errors = error.inner.map((item: any) => (item.message));

    dispatch(formValidationErrors(errors));
  }
};

export const editAttendeeForm = (field: string, value: string) => ({
  type: EDIT_ATTENDEE_FORM,
  field,
  value,
});

export const setAttendeeForm = (attendee: Attendee) => ({
  type: SET_ATTENDEE_FORM,
  payload: attendee,
});
