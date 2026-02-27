import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Box,
} from 'tharaday';

import * as actions from '../../actions/attendeeListActions';
import Alert from '../../components/alert/Alert';
import { RootState, Attendee } from '../../types';
import { AppDispatch } from '../../configureStore';

const AttendeeList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) => state.attendeeList.status);
  const msg = useSelector((state: RootState) => state.attendeeList.msg);
  const attendeeList = useSelector((state: RootState) => state.attendeeList.attendeeList);

  useEffect(() => {
    dispatch(actions.requestAttendeeList());
  }, [dispatch]);

  return (
    <Box padding={6}>
      {status !== 'initial' && (
        <Alert type={status} msg={msg} />
      )}
      {status !== 'danger' && attendeeList.length > 0 && (
        <Table striped hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Event Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendeeList.map((attendee: Attendee, index: number) => (
              <TableRow key={attendee.slug}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{attendee.firstName}</TableCell>
                <TableCell>{attendee.lastName}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{dayjs(attendee.eventDate).format('YYYY-MM-DD')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {status !== 'danger' && attendeeList.length === 0 && (
        <Box padding={10}>
          <Text variant="h2" align="center">No Attendees!</Text>
        </Box>
      )}
    </Box>
  );
};

export default AttendeeList;
