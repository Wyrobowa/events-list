import { ChangeEventHandler } from 'react';

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
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      className="form-control"
      id={id}
      name={id}
      value={value}
      type={type}
      onChange={onChange}
    />
  </div>
);

export default InputFormField;
