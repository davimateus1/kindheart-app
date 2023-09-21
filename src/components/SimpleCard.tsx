import { Flex, Heading, Text } from 'native-base';
import { ComponentProps } from 'react';

type SimpleCardProps = {
  value: number;
  label: string;
} & ComponentProps<typeof Flex>;

export function SimpleCard({ value, label, ...rest }: SimpleCardProps) {
  return (
    <Flex
      direction="column"
      p={3}
      w="30%"
      justify="center"
      align="center"
      borderRadius={20}
      borderWidth={1}
      borderColor="brand.400"
      {...rest}
    >
      <Heading color="brand.100" fontWeight="bold" fontSize="2xl" textAlign="center">
        {value}
      </Heading>
      <Text color="brand.400" fontSize="xs" fontWeight="bold" textAlign="center">
        {label}
      </Text>
    </Flex>
  );
}
