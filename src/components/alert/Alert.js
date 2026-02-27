import PropTypes from 'prop-types';

const Alert = ({ type, msg, children }) => (
  <div className={`alert alert-${type} mt-3`}>
    <h4 className="alert-heading">{msg}</h4>
    {children}
  </div>
);

Alert.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']).isRequired,
  msg: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Alert.defaultProps = {
  children: '',
};

export default Alert;
