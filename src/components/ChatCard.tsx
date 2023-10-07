import { Ionicons } from '@expo/vector-icons';
import { Avatar, Flex, IconButton, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { convertISODate } from 'src/utils';

export function ChatCard() {
  const navigateToProfile = () => {
    console.log('navigateToProfile');
  };

  return (
    <Flex
      bg="white"
      my={2}
      h={75}
      borderRadius={5}
      p={3}
      borderWidth={0.5}
      borderColor="brand.400"
      shadow={3}
      direction="row"
      justify="space-between"
    >
      <Flex w="85%" direction="row">
        <TouchableOpacity onPress={navigateToProfile}>
          <Avatar
            source={{ uri: 'https://avatars.githubusercontent.com/u/66326378?v=4' }}
            size="md"
            mr={2}
            bg="brand.400"
          >
            Davi
            <Avatar.Badge bg="green.500" borderWidth={1} borderColor="brand.300" />
          </Avatar>
        </TouchableOpacity>
        <Flex justify="space-around" h="auto" w="100%">
          <Flex direction="row">
            <Text color="brand.100" fontWeight="500" fontSize="sm">
              Jhonas
            </Text>
            <Text color="brand.100" fontWeight="500" fontSize="sm" opacity={0.6} ml={1}>
              • {convertISODate('2021-09-01T00:00:00.000Z')}
            </Text>
          </Flex>
          <Text color="brand.200" noOfLines={1} maxW="70%" opacity={0.7}>
            Olá, tudo bem? Estou interessado em comprar o seu produto. Podemos negociar?
          </Text>
        </Flex>
      </Flex>
      <IconButton
        icon={<Ionicons name="chevron-forward" size={24} color="#28CD56" />}
        bg="transparent"
        _pressed={{ bg: 'transparent' }}
        onPress={() => console.log('pressed')}
        w="15%"
      />
    </Flex>
  );
}
