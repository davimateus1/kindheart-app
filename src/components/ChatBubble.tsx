import React from 'react';

import { Flex, Image, Text } from 'native-base';

type ChatBubbleProps = {
  message: string;
  isMyMessage: boolean;
  userAvatar: string;
};

export function ChatBubble({ message, isMyMessage, userAvatar }: ChatBubbleProps) {
  return (
    <Flex
      direction="row"
      bgColor={isMyMessage ? 'green.500' : 'transparent'}
      borderRadius={8}
      maxWidth="70%"
      alignSelf={isMyMessage ? 'flex-end' : 'flex-start'}
      mt={2}
    >
      {!isMyMessage && (
        <Image
          source={{ uri: userAvatar }}
          alt="User Avatar"
          size={8}
          borderRadius={50}
          marginRight={2}
        />
      )}
      <Flex
        direction="column"
        bgColor={isMyMessage ? 'transparent' : 'white'}
        borderRadius={8}
        p={3}
      >
        <Text color={isMyMessage ? 'white' : 'black'} fontSize={16}>
          {message}
        </Text>
      </Flex>
    </Flex>
  );
}
