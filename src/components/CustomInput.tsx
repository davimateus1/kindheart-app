import {
  FormControl,
  IInputProps,
  Input,
  IStackProps,
  ITextProps,
  Stack,
  Text,
} from "native-base";
import { memo } from "react";
import {
  ControllerProps,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";
import { useMaskedInputProps, Mask } from "react-native-mask-input";

export type InputProps = {
  label?: string;
  name: string;
  control: ControllerProps<any>["control"];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
  rules?: UseControllerProps["rules"];
  mask?: Mask;
  inputProps?: IInputProps;
  stackProps?: IStackProps;
  labelProps?: ITextProps;
  isEditable?: boolean;
};

const defaultLabelStyle: ITextProps = {
  fontSize: "15",
};

const BaseInput = ({
  label,
  name,
  error,
  control,
  rules = {},
  mask,
  inputProps,
  labelProps,
  isEditable = true,
  stackProps,
}: InputProps) => {
  const {
    field: { onChange, value: valueInput },
  } = useController({ name: name || "", control, rules });
  const maskedInputProps = useMaskedInputProps({
    value: valueInput,
    onChangeText: (text) => {
      if (isEditable) {
        onChange(text);
      }
    },
    mask,
  });

  return (
    <Stack space={1} w="100%" {...stackProps}>
      <FormControl w="100%" isInvalid={error ? true : false}>
        {label && (
          <FormControl.Label {...defaultLabelStyle}>
            <Text
              {...{ ...defaultLabelStyle, ...labelProps }}
              color={error ? "red.500" : "brand.50"}
            >
              {label}
            </Text>
          </FormControl.Label>
        )}

        <Input
          {...maskedInputProps}
          {...inputProps}
          isDisabled={!isEditable}
          borderColor={error ? "red.500" : "brand.50"}
          color={error ? "red.500" : "brand.100"}
          borderWidth={1}
          borderRadius={7}
          fontSize={13}
        />

        {error && (
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
};

export const CustomInput = memo(BaseInput);
