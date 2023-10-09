import { Flex, Image, Text } from 'native-base';
import { convertISODate } from 'src/utils';
import { CustomButton } from './CustomButton';

type ActionActivityCardProps = {
  photo?: string;
  description?: string;
  createdAt?: string;
};

export function ActionActivityCard({ photo, description, createdAt }: ActionActivityCardProps) {
  return (
    <Flex w="100%" h="100%" borderBottomColor="brand.400" borderBottomWidth={1} justify="center">
      <Flex direction="column" w="100%" px="5">
        <Flex direction="row">
          <Image source={{ uri: photo }} alt="image" size="sm" rounded="md" />
          <Flex justify="center" ml={2}>
            <Text noOfLines={2} maxW="90%" color="brand.200">
              <Text fontWeight="bold">{convertISODate(createdAt ?? '')} - </Text>
              <Text>{description}</Text>
            </Text>
            <Text fontSize="xs" color="brand.400" noOfLines={1} maxW="93%">
              @davimateus1 tem interesse em sua atividade
            </Text>
          </Flex>
        </Flex>
        <Flex direction="row" w="100%" justify="flex-end">
          <CustomButton
            w="35%"
            h={8}
            p={0}
            mr={5}
            bg="red.500"
            borderWidth={1}
            borderColor="brand.400"
            _pressed={{ bg: 'red.500' }}
          >
            Rejeitar
          </CustomButton>
          <CustomButton
            w="35%"
            h={8}
            p={0}
            bg="green.500"
            borderWidth={1}
            borderColor="brand.400"
            _pressed={{ bg: 'green.500' }}
          >
            Aceitar
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
}
