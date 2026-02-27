import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

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
    <div className="container-fluid mt-3">
      {status !== 'initial' && (
        <Alert type={status} msg={msg} />
      )}
      {status !== 'danger' && attendeeList.length > 0 && (
        <div className="row p-3 border-bottom border-secondary text-white bg-secondary">
          <div className="col-md-1">#</div>
          <div className="col-md-3">First Name</div>
          <div className="col-md-3">Last Name</div>
          <div className="col-md-3">Email</div>
          <div className="col-md-2">Event Date</div>
        </div>
      )}
      <div>
        {status !== 'danger' && attendeeList.length > 0 && attendeeList.map((attendee: Attendee, index: number) => (
          <div className="row p-3 border-bottom border-secondary" key={attendee.slug}>
            <div className="col-md-1">{index + 1}</div>
            <div className="col-md-3">{attendee.firstName}</div>
            <div className="col-md-3">{attendee.lastName}</div>
            <div className="col-md-3">{attendee.email}</div>
            <div className="col-md-2">{dayjs(attendee.eventDate).format('YYYY-MM-DD')}</div>
          </div>
        ))}
        {status !== 'danger' && attendeeList.length === 0 && (
          <h2 className="text-center">No Attendees!</h2>
        )}
      </div>
    </div>
  );
};

export default AttendeeList;
