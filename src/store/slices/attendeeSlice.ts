import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Attendee, AttendeeFormState } from '../../types';
import { addAttendee } from './attendeeListSlice';
import { attendeeService } from '../../services/attendeeService';

const initialState: AttendeeFormState = {
  attendeeForm: {
    firstName: '',
    lastName: '',
    email: '',
    eventDate: '',
    ticketType: 'standard',
    eventTitle: '',
    eventDescription: '',
  },
  status: 'initial',
  msg: '',
  formValidationErrors: [],
};

export const submitAttendeeForm = createAsyncThunk(
  'attendee/submitAttendeeForm',
  async ({ schema, attendeeForm }: { schema: any, attendeeForm: Attendee }, { dispatch, rejectWithValue }) => {
    try {
      await schema.validate(attendeeForm, { abortEarly: false });
      
      const id = await attendeeService.createAttendee(attendeeForm);
      
      const newAttendee = {
        ...attendeeForm,
        slug: attendeeForm.slug || `attendee-${id || Date.now()}`,
      };

      dispatch(addAttendee(newAttendee));
      return 'Form has been saved!';
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const errors = error.inner.map((item: any) => item.message);
        return rejectWithValue({ type: 'validation', errors });
      }
      return rejectWithValue({ type: 'api', message: error.message || 'Something went wrong!' });
    }
  }
);

const attendeeSlice = createSlice({
  name: 'attendee',
  initialState,
  reducers: {
    editAttendeeForm: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload;
      (state.attendeeForm as any)[field] = value;
    },
    setAttendeeForm: (state, action: PayloadAction<Attendee>) => {
      state.attendeeForm = action.payload;
    },
    clearAttendeeForm: (state) => {
      state.attendeeForm = initialState.attendeeForm;
    },
    resetStatus: (state) => {
      state.status = 'initial';
      state.formValidationErrors = [];
    },
    setSuccessStatus: (state) => {
      state.status = 'success';
      state.msg = 'Form has been saved!';
      state.formValidationErrors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAttendeeForm.pending, (state) => {
        state.status = 'initial';
        state.msg = '';
        state.formValidationErrors = [];
      })
      .addCase(submitAttendeeForm.fulfilled, (state, action) => {
        state.status = 'success';
        state.msg = action.payload;
        state.attendeeForm = initialState.attendeeForm;
        state.formValidationErrors = [];
      })
      .addCase(submitAttendeeForm.rejected, (state, action) => {
        state.status = 'danger';
        const payload = action.payload as any;
        if (payload?.type === 'validation') {
          state.msg = 'Form validation errors!';
          state.formValidationErrors = payload.errors;
        } else {
          state.msg = payload?.message || 'Something went wrong!';
          state.formValidationErrors = [];
        }
      });
  },
});

export const {
  editAttendeeForm,
  setAttendeeForm,
  clearAttendeeForm,
  resetStatus,
  setSuccessStatus,
} = attendeeSlice.actions;
export default attendeeSlice.reducer;
