import { Controller, FieldValues, Control } from 'react-hook-form';
import { Input, FormGroup, InputProps } from 'reactstrap';

type CustomFieldProps = {
  control: Control<FieldValues, object>;
  fieldName: string;
  error?: { message: string };
  defaultValue?: string;
  placeholder?: string;
  type?: InputProps['type'];
  disabled?: boolean;
  id?: string;
  className?: string;
};

export const CustomInputField: React.FC<CustomFieldProps> = ({ control, fieldName, error, defaultValue = '', placeholder = '', type, disabled = false }) => (
  <FormGroup>
    <Controller
      name={fieldName}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, onChange, ...field } }) => (
        <>
          <Input
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            id={fieldName}
            {...field}
            innerRef={ref}
            onChange={({ target: { value } }) => onChange(value)}
            aria-invalid={!!error}
          />
        </>
      )}
    />
    {error && (
      <span className="text-danger text-xs mt-1" role="alert">
        {error.message}
      </span>
    )}
  </FormGroup>
);
