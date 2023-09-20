import { FormControl, ISelectProps, ITextProps, Select, Stack, Text } from 'native-base';
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface InputProps {
  label?: string;
  name: string;
  control: Control<any>;
  options: Option[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  selectProps?: ISelectProps;
  rules?: UseControllerProps['rules'];
  labelProps?: ITextProps;
}

const defaultLabelStyle: ITextProps = {
  fontSize: '15',
};

export function CustomSelect({
  label,
  name,
  options,
  error,
  control,
  selectProps,
  rules,
  labelProps,
}: InputProps) {
  const {
    field: { onChange, value },
  } = useController({ name, control, rules });

  return (
    <Stack space={1} w="100%">
      <FormControl w="100%" isInvalid={!!error}>
        {label && (
          <FormControl.Label {...defaultLabelStyle}>
            <Text
              color={error ? 'red.500' : 'brand.50'}
              {...{ ...defaultLabelStyle, ...labelProps }}
            >
              {label}
            </Text>
          </FormControl.Label>
        )}
        <Select
          onValueChange={(currValue: string) => {
            onChange(currValue);
          }}
          selectedValue={value}
          _selectedItem={{
            bg: 'brand.50',
          }}
          borderColor={error ? 'red.500' : 'brand.50'}
          color={error ? 'red.500' : 'brand.50'}
          {...selectProps}
        >
          {options.map(({ value, label }: Option) => (
            <Select.Item key={value} label={label} value={value} />
          ))}
        </Select>

        {error && <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>}
      </FormControl>
    </Stack>
  );
}
