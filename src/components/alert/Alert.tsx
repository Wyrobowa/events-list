import { ReactNode } from 'react';
import { Notification } from 'tharaday';

interface AlertProps {
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  msg: string;
  children?: ReactNode;
}

const Alert = ({ type, msg, children }: AlertProps) => {
  const intentMap: Record<string, any> = {
    primary: 'info',
    secondary: 'neutral',
    success: 'success',
    danger: 'danger',
    warning: 'warning',
    info: 'info',
  };

  return (
    <Notification intent={intentMap[type]} title={msg} style={{ marginTop: '1rem' }}>
      {children}
    </Notification>
  );
};

export default Alert;
