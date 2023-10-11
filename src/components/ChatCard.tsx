import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Flex, IconButton, Text } from 'native-base';
import { Message } from 'src/@types/chatTypes';

import { convertISODate } from 'src/utils';

type ChatCardProps = {
  userPhoto: string;
  userName: string;
  updatedAt: string;
  messages?: Array<Message>;
  chatId: number;
  userSenderId: number;
  activityId: number;
  chatStatus: 'ACTIVE' | 'INACTIVE';
  chatSuccess: boolean;
};

export function ChatCard({
  chatId,
  userSenderId,
  activityId,
  userPhoto,
  userName,
  updatedAt,
  messages,
  chatStatus,
  chatSuccess,
}: ChatCardProps) {
  const { navigate } = useNavigation() as any;

  const lastMessage = messages?.[messages.length - 1]?.text;

  const handleNavigateToChat = () => {
    navigate('Chat', { chatId, userSenderId, activityId, userName });
  };

  const selectBgColor = () => {
    if (chatSuccess && chatStatus === 'INACTIVE') {
      return 'brand.50';
    }

    if (!chatSuccess && chatStatus === 'INACTIVE') {
      return 'red.100';
    }

    return 'white';
  };

  return (
    <Flex
      bg={selectBgColor()}
      my={2}
      h={75}
      borderRadius={5}
      p={3}
      borderWidth={0.5}
      borderColor="brand.400"
      shadow={3}
      direction="row"
      justify="space-between"
      opacity={chatStatus === 'ACTIVE' ? 1 : 0.6}
    >
      <Flex w="85%" direction="row">
        <Avatar source={{ uri: userPhoto }} size="md" mr={2} bg="brand.400">
          {userName[0]}
        </Avatar>
        <Flex justify="space-around" h="auto" w="100%">
          <Flex direction="row">
            <Text color="brand.100" fontWeight="500" fontSize="sm">
              {userName}
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
