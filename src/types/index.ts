export interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: string;
  ticketType: 'standard' | 'vip' | 'speaker';
  eventTitle: string;
  eventDescription: string;
  slug?: string;
}

export interface AttendeeFormState {
  attendeeForm: Attendee;
  status: 'initial' | 'success' | 'danger';
  msg: string;
  formValidationErrors: string[];
}

export interface AttendeeListState {
  attendeeList: Attendee[];
  status: 'initial' | 'danger';
  msg: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  status: 'initial' | 'loading' | 'success' | 'danger';
  msg: string;
}

export interface RootState {
  attendee: AttendeeFormState;
  attendeeList: AttendeeListState;
  auth: AuthState;
}
