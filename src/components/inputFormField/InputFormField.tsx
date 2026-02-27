import { ChangeEventHandler } from 'react';
import { Input } from 'tharaday';

interface InputFormFieldProps {
  id: string;
  label: string;
  value?: string | number;
  type?: 'text' | 'email' | 'date';
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputFormField = ({
  id,
  label,
  value = '',
  type = 'text',
  onChange,
}: InputFormFieldProps) => (
  <div style={{ marginBottom: '1rem' }}>
    <Input
      label={label}
      id={id}
      name={id}
      value={value}
      type={type}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  </div>
);

export default InputFormField;
