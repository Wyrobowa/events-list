import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

// Actions
import * as actions from '../../actions/attendiesListActions';

// Components
import Alert from '../../components/alert/Alert';

// Reducers
import * as reducer from '../../reducers/attendiesListReducer';

const AttendiesList = ({
  status,
  msg,
  attendiesList,
  getAttendiesListAction,
}) => {
  useEffect(() => {
    getAttendiesListAction();
  }, []);

  return (
    <div className="container-fluid mt-3">
      {status !== 'initial' && (
        <Alert type={status} msg={msg} />
      )}
      {status !== 'danger' && attendiesList.length > 0 && (
        <div className="row p-3 border-bottom border-secondary text-white bg-secondary">
          <div className="col-md-1">#</div>
          <div className="col-md-3">First Name</div>
          <div className="col-md-3">Last Name</div>
          <div className="col-md-3">Email</div>
          <div className="col-md-2">Event Date</div>
        </div>
      )}
      <div>
        {status !== 'danger' && attendiesList.length > 0 && attendiesList.map((attendee, index) => (
          <div className="row p-3 border-bottom border-secondary" key={attendee.slug}>
            <div className="col-md-1">{index + 1}</div>
            <div className="col-md-3">{attendee.firstName}</div>
            <div className="col-md-3">{attendee.lastName}</div>
            <div className="col-md-3">{attendee.email}</div>
            <div className="col-md-2">{dayjs(attendee.eventDate).format('YYYY-MM-DD')}</div>
          </div>
        ))}
        {status !== 'danger' && attendiesList.length === 0 && (
          <h2 className="text-center">No Attendies!</h2>
        )}
      </div>
    </div>
  );
};

AttendiesList.propTypes = {
  status: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  attendiesList: PropTypes.array.isRequired,
  getAttendiesListAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  status: reducer.getStatus(state),
  msg: reducer.getMessage(state),
  attendiesList: reducer.getAttendiesList(state),
});

export default connect(
  mapStateToProps,
  {
    getAttendiesListAction: actions.requestAttendiesList,
  },
)(AttendiesList);
