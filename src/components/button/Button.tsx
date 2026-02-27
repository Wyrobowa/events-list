import { forwardRef, MouseEventHandler } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick: MouseEventHandler<HTMLButtonElement>;
  text?: string;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { type = 'button', onClick, text = '', className = 'btn' },
  ref
) => (
  <button type={type} onClick={onClick} className={className} ref={ref}>
    {text}
  </button>
));

Button.displayName = 'Button';

export default Button;
