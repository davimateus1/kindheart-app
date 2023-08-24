import { ComponentProps } from 'react';
import { Button } from 'native-base';

type ButtonProps = {
  text: string;
} & ComponentProps<typeof Button>;

export function CustomButton({ text, ...rest }: ButtonProps) {
  return (
    <Button bgColor="brand.50" color="brand.100" w="80%" borderRadius={7} {...rest}>
      {text}
    </Button>
  );
}
