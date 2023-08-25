import { ComponentProps, ReactNode } from 'react';
import { Button } from 'native-base';

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<typeof Button>;

export function CustomButton({ children, ...rest }: ButtonProps) {
  return (
    <Button bgColor="brand.50" color="brand.100" w="80%" borderRadius={7} {...rest}>
      {children}
    </Button>
  );
}
