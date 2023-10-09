import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Flex, IconButton, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { convertISODate } from 'src/utils';

type ChatCardProps = {
  userPhoto: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  messages?: string[];
  chatId: number;
  userSenderId: number;
  activityId: number;
};

export function ChatCard({
  chatId,
  userSenderId,
  activityId,
  userPhoto,
  firstName,
  lastName,
  updatedAt,
  messages,
}: ChatCardProps) {
  const { navigate } = useNavigation() as any;

  const lastMessage = messages?.[messages.length - 1];

  const navigateToProfile = () => {
    console.log('navigateToProfile');
  };

  const handleNavigateToChat = () => {
    navigate('Chat', { chatId, userSenderId, activityId });
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
          <Avatar source={{ uri: userPhoto }} size="md" mr={2} bg="brand.400">
            {firstName[0]}
            <Avatar.Badge bg="green.500" borderWidth={1} borderColor="brand.300" />
          </Avatar>
        </TouchableOpacity>
        <Flex justify="space-around" h="auto" w="100%">
          <Flex direction="row">
            <Text color="brand.100" fontWeight="500" fontSize="sm">
              {firstName} {lastName}
            </Text>
            <Text color="brand.100" fontWeight="500" fontSize="sm" opacity={0.6} ml={1}>
              • {convertISODate(updatedAt)}
            </Text>
          </Flex>
          <Text color="brand.200" noOfLines={1} maxW="70%" opacity={0.7}>
            {lastMessage ?? 'Comece uma conversa! :D'}
          </Text>
        </Flex>
      </Flex>
      <IconButton
        icon={<Ionicons name="chevron-forward" size={24} color="#28CD56" />}
        bg="transparent"
        _pressed={{ bg: 'transparent' }}
        onPress={handleNavigateToChat}
        w="15%"
      />
    </Flex>
  );
}
