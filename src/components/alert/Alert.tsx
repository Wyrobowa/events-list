import { ReactNode } from 'react';

interface AlertProps {
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  msg: string;
  children?: ReactNode;
}

const Alert = ({ type, msg, children }: AlertProps) => (
  <div className={`alert alert-${type} mt-3`}>
    <h4 className="alert-heading">{msg}</h4>
    {children}
  </div>
);

export default Alert;
