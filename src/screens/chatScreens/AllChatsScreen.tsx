import { Box, Flex, Heading, ScrollView, Spinner, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { ChatCard, CustomHeader, Tabs } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { useGetUserChats } from 'src/store';
import socket from 'src/utils/socket';

export function AllChatsScreen() {
  const { user } = useAuth();

  const [tabIndex, setTabIndex] = useState<0 | 1>(0);
  const { data: chats, isLoading, refetch } = useGetUserChats({ userId: user?.id as number });

  const activeChats = chats?.filter(chat => chat.status === 'ACTIVE');
  const inactiveChats = chats?.filter(chat => chat.status === 'INACTIVE');

  const selectChats = () => {
    if (tabIndex === 0) {
      return activeChats;
    }
    return inactiveChats;
  };

  useEffect(() => {
    socket.on('new_message', message => {
      if (message.author_id !== user?.id) {
        refetch();
      }
    });
  }, [refetch, user]);

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader justify="flex-end">
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          Mensagens
        </Heading>
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
