import { Button, Flex } from 'native-base';
import { ComponentProps, ReactNode } from 'react';
import { CustomButton } from './CustomButton';

type CustomHeaderProps = {
  icon?: ReactNode;
  children?: ReactNode;
  buttonProps?: ComponentProps<typeof Button>;
} & ComponentProps<typeof Flex>;

export function CustomHeader({ icon, children, buttonProps, ...rest }: CustomHeaderProps) {
  return (
    <Flex
      w="100%"
      justify={icon ? 'space-between' : 'flex-end'}
      px={5}
      pb={2}
      borderBottomWidth={1}
      borderBottomColor="brand.300"
      direction="row"
      align="center"
      {...rest}
    >
      {icon && (
        <CustomButton w={12} h={12} {...buttonProps}>
          {icon}
        </CustomButton>
      )}
      {children}
    </Flex>
  );
}
