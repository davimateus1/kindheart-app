import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Box, Flex, Image, ScrollView, Spinner, Text } from 'native-base';
import { ChatBubble, CustomButton, CustomHeader, CustomInput } from 'src/components';

import { useForm } from 'react-hook-form';
import { useCreateChatMessage, useGetUserChat } from 'src/store';
import { ActionActivityCard } from 'src/components/ActionActivityCard';
import { useEffect } from 'react';
import socket from 'src/utils/socket';
import { useAuth } from 'src/contexts/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSchema, messageSchema } from 'src/schemas';
import KindheartLogo from 'assets/images/kindheart-logo.png';

type ChatScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
  route: RouteProp<
    Record<string, { chatId: number; userSenderId: number; activityId: number; userName: string }>
  >;
};

export function ChatScreen({ navigation, route }: ChatScreenProps) {
  const { user } = useAuth();
  const { chatId, userSenderId, activityId, userName } = route.params;

  const {
    data: chat,
    refetch,
    isLoading,
  } = useGetUserChat({
    chatId: String(chatId),
    activityId: String(activityId),
  });

  const isInactiveChat = chat?.status === 'INACTIVE';

  const isElderly = chat?.activity?.user_elderly_id === user?.id;

  const { messageMutate, messageLoading } = useCreateChatMessage();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<MessageSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(messageSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoElderlyStatute = () => {
    navigation.navigate('ElderlyStatute');
  };

  useEffect(() => {
    socket.on('new_message', message => {
      if (message.chat_id === Number(chatId) && message.author_id !== user?.id) {
        refetch();
      }
    });
  }, [chatId, refetch, user]);

  const handleSubmitMessage = handleSubmit(data => {
    messageMutate({
      chat_id: String(chatId),
      author_id: String(user?.id),
      text: data.message,
    });

    reset({ message: '' });
  });

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
        justify="space-between"
      >
        <Flex w="100%" justify="space-between" direction="row">
          <Flex direction="row" align="center" w="75%">
            <Flex
              bg="green.500"
              borderRadius={50}
              w={3}
              h={3}
              justify="center"
              align="center"
              mx={2}
            />
            <Text color="brand.200" fontWeight="bold">
              {userName}
            </Text>
          </Flex>
          <Flex w="25%" justify="flex-start" direction="row" align="center">
            <CustomButton
              w={10}
              h={10}
              bg="opacity.green-40"
              rounded="full"
              p="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              _pressed={{ bg: 'opacity.green-40' }}
              onPress={handleGoElderlyStatute}
            >
              <Ionicons name="alert-circle-outline" size={30} color="#28CD56" />
            </CustomButton>
          </Flex>
        </Flex>
      </CustomHeader>

      <Flex flex={1} direction="column" align="center" w="100%">
        {isElderly && !isInactiveChat && (
          <Flex h="17%" w="100%">
            <ActionActivityCard
              description={chat?.activity?.description}
              photo={chat?.activity?.image}
              createdAt={chat?.activity?.created_at}
              userSenderId={userSenderId}
              chatId={chatId}
              activityId={activityId}
              acticityStatus={chat?.activity?.status}
              userSenderName={chat?.user_sender.first_name ?? ''}
              messageMutate={messageMutate}
            />
          </Flex>
        )}
        <Flex
          h={isElderly && !isInactiveChat ? '70%' : '87%'}
          bg="opacity.green-40"
          w="100%"
          px={5}
        >
          <ScrollView w="100%" overScrollMode="never" mb={2}>
            {isLoading ? (
              <Flex flex={1} justify="center" align="center" mt={10}>
                <Spinner color="brand.50" size={50} />
              </Flex>
            ) : (
              <Box>
                {chat?.messages.length ? (
                  <Box>
                    {chat?.messages.map(message => (
                      <ChatBubble
                        key={message.id}
                        message={message.text}
                        userAvatar={message.author_photo}
                        isMyMessage={message.author_id === user?.id}
                      />
                    ))}
                  </Box>
                ) : (
                  <Flex flex={1} direction="column" align="center">
                    <Image source={KindheartLogo} alt="kindheart-logo" mt={5} />
                    <Text color="brand.200" fontWeight="bold" textAlign="center" mt={5}>
                      Envie uma mensagem para iniciar a conversa.
                    </Text>
                  </Flex>
                )}
                {isInactiveChat && (
                  <Flex>
                    <Text color="brand.200" fontWeight="bold" textAlign="center" mt={5}>
                      Essa atividade foi finalizada e não é mais possível enviar mensagens.
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </ScrollView>
        </Flex>
        <Flex
          h="13%"
          w="100%"
          direction="row"
          justify="space-between"
          align="center"
          p={3}
          borderTopWidth={1}
          borderTopColor="brand.400"
        >
          <CustomInput
            control={control}
            name="message"
            stackProps={{ w: '85%' }}
            inputProps={{
              placeholder: 'Digite sua mensagem...',
              bg: 'opacity.green-40',
              color: 'brand.200',
              _focus: { borderColor: 'brand.50', bg: 'opacity.green-40' },
            }}
            error={errors.message}
            isEditable={!isInactiveChat}
          />
          <Flex w="15%" align="flex-end">
            <CustomButton
              w={12}
              h={12}
              bg="brand.50"
              rounded="full"
              p="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              _pressed={{ bg: 'opacity.green-40' }}
              onPress={handleSubmitMessage}
              isLoading={messageLoading}
              isDisabled={isInactiveChat}
            >
              <Feather name="send" size={25} color="white" />
            </CustomButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
