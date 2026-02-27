import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Attendee, AttendeeListState } from '../../types';
import { attendeeService } from '../../services/attendeeService';

const initialState: AttendeeListState = {
  attendeeList: [],
  status: 'initial',
  msg: '',
};

export const fetchAttendees = createAsyncThunk(
  'attendeeList/fetchAttendees',
  async (_, { rejectWithValue }) => {
    try {
      return await attendeeService.fetchAttendees();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong! List of attendees couldn\'t be loaded!');
    }
  }
);

const attendeeListSlice = createSlice({
  name: 'attendeeList',
  initialState,
  reducers: {
    addAttendee: (state, action: PayloadAction<Attendee>) => {
      state.attendeeList.push(action.payload);
    },
    updateAttendee: (state, action: PayloadAction<Attendee>) => {
      const index = state.attendeeList.findIndex(a => a.slug === action.payload.slug);
      if (index !== -1) {
        state.attendeeList[index] = action.payload;
      }
    },
    deleteAttendee: (state, action: PayloadAction<string>) => {
      state.attendeeList = state.attendeeList.filter(a => a.slug !== action.payload);
    },
    clearAllAttendees: (state) => {
      state.attendeeList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendees.pending, (state) => {
        state.status = 'initial';
        state.msg = '';
      })
      .addCase(fetchAttendees.fulfilled, (state, action) => {
        state.attendeeList = action.payload;
        state.status = 'initial';
      })
      .addCase(fetchAttendees.rejected, (state, action) => {
        state.status = 'danger';
        state.msg = action.payload as string;
      });
  },
});

export const { addAttendee, updateAttendee, deleteAttendee, clearAllAttendees } = attendeeListSlice.actions;
export default attendeeListSlice.reducer;
