import { ComponentProps } from "react";
import { Button as NativeButton } from "native-base";

type ButtonProps = {
  text: string;
} & ComponentProps<typeof NativeButton>;

export const Button = ({ text, ...rest }: ButtonProps) => {
  return (
    <NativeButton
      bgColor="brand.50"
      color="brand.100"
      w="80%"
      borderRadius={7}
      {...rest}
    >
      {text}
    </NativeButton>
  );
};
