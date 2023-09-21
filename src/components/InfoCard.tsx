import { Flex, Heading, Text } from 'native-base';
import { ComponentProps } from 'react';

type InfoCardProps = {
  value: number;
  label: string;
} & ComponentProps<typeof Flex>;

export function InfoCard({ value, label, ...rest }: InfoCardProps) {
  return (
    <Flex
      direction="column"
      px={3}
      py={5}
      w="30%"
      justify="center"
      align="center"
      borderRadius={20}
      borderWidth={1}
      borderColor="brand.400"
      {...rest}
    >
      <Heading color="brand.100" fontWeight="bold" fontSize="3xl" textAlign="center">
        {value}
      </Heading>
      <Text color="brand.400" fontSize="sm" fontWeight="200" textAlign="center">
        {label}
      </Text>
    </Flex>
  );
}
