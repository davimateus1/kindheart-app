import { Box, Flex, Heading, ScrollView, Spinner, Text } from 'native-base';
import { useState } from 'react';
import { ChatCard, CustomHeader, Tabs } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { useGetUserChats } from 'src/store';

export function AllChatsScreen() {
  const { user } = useAuth();
  const newMessagesCount = 28;
  const [tabIndex, setTabIndex] = useState<0 | 1>(0);
  const { data: chats, isLoading } = useGetUserChats({ userId: user?.id as number });

  const activeChats = chats?.filter(chat => chat.status === 'ACTIVE');
  const inactiveChats = chats?.filter(chat => chat.status === 'INACTIVE');

  const selectChats = () => {
    if (tabIndex === 0) {
      return activeChats;
    }
    return inactiveChats;
  };

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
            {isLoading ? (
              <Flex flex={1} justify="center" align="center">
                <Spinner color="brand.50" size={50} />
              </Flex>
            ) : (
              <Box>
                {selectChats()?.length ? (
                  <Box>
                    {selectChats()?.map(chat => (
                      <ChatCard
                        key={chat.id}
                        chatId={chat.id}
                        messages={chat.messages}
                        updatedAt={chat.updated_at}
                        activityId={chat.activity_id}
                        userSenderId={user?.id as number}
                        userPhoto={chat.user_photo}
                        userName={chat.user_name}
                        chatStatus={chat.status}
                        chatSuccess={chat.success}
                      />
                    ))}
                  </Box>
                ) : (
                  <Flex flex={1} justify="center" align="center">
                    <Text color="brand.100" fontWeight="500" fontSize="lg">
                      Nenhuma conversa encontrada
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </ScrollView>
        </Flex>
      </Flex>
    </Flex>
  );
}
