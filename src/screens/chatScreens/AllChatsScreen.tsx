import { Flex, Heading, ScrollView, Text } from 'native-base';
import { useState } from 'react';
import { ChatCard, CustomHeader, Tabs } from 'src/components';

export function AllChatsScreen() {
  const newMessagesCount = 28;
  const [tabIndex, setTabIndex] = useState<0 | 1>(0);

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader justify="flex-end">
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          Mensagens
        </Heading>

        {newMessagesCount > 0 && (
          <Flex
            bg="secondary.50"
            borderRadius={50}
            w={7}
            h={7}
            justify="center"
            align="center"
            ml={2}
          >
            <Text>{newMessagesCount}</Text>
          </Flex>
        )}
      </CustomHeader>

      <Flex flex={1} direction="column" align="center" w="100%">
        <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <Flex w="100%" h="100%" p={5}>
          <ScrollView w="100%" h="100%" overScrollMode="never" mb={16}>
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
          </ScrollView>
        </Flex>
      </Flex>
    </Flex>
  );
}
