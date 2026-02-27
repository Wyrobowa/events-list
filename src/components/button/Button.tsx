import { MouseEventHandler } from 'react';
import { Button as DSButton } from 'tharaday';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick: MouseEventHandler<HTMLButtonElement>;
  text?: string;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type = 'button',
  onClick,
  text = '',
  className = '',
  disabled = false,
}: ButtonProps) => {
  let intent: any = 'neutral';
  if (className.includes('btn-primary')) intent = 'info';
  if (className.includes('btn-success')) intent = 'success';
  if (className.includes('btn-danger')) intent = 'danger';
  if (className.includes('btn-warning')) intent = 'warning';

  return (
    <DSButton
      type={type}
      onClick={onClick}
      intent={intent}
      disabled={disabled}
      fullWidth={className.includes('btn-block')}
      className={className}
    >
      {text}
    </DSButton>
  );
};

export default Button;
